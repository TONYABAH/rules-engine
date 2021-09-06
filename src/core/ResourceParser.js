import Tokenizer from "./ResourceLexer";
import {
    NUM,
    ATTR,
    LINE,
    EOF,
    LPAREN,
    RPAREN,
    EQ,
    REM,
    SPACE,
    COMMENT,
    COLON,
} from "./TokenConstants";
const editText = `
    full name: Anthony Abah
    street address: 23 Oshipitan Storage Event
    phone: 0989765655456
    phone: 89646464644646
    work email abah.a@nafdac.gov.ng:
    your message: Please come to {0} Adeleye Street, 1} Ladilak
  `;

function ResourceParser(lang, languageModule) {
    const language = lang;
    const keywords = languageModule.keywords;
    var errors = [];
    var data = {};
    // const row = 0;
    function error(data, flag = "error") {
        const e = {
            type: flag, // "error"|"warning"|"info"
            row: data.row, // row index
            column: data.col, // character index on line
            text: data.msg, // Error message
            raw: data.raw, // "Missing semicolon"
        };
        errors.push(e);
        throw new Error(e.text + " " + e.raw);
    }
    function transform(tokens) {
        let transformed = [];
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            if (token.type === "EOF") break;
            let phrase = [];
            if (token.type === ATTR) {
                let row = token.row;
                let col = token.column;
                do {
                    phrase.push(token.value);
                    i++;
                    token = tokens[i];
                    if (token.type === REM) {
                        i++;
                        token = tokens[i];
                        continue;
                    }
                } while (
                    token &&
                    (token.type === ATTR ||
                        token.type == NUM ||
                        token.type === SPACE)
                );
                i--;
                if (phrase.length > 0) {
                    if (phrase[phrase.length - 1] === " ") {
                        phrase.pop();
                        i--;
                    }
                    let attr = phrase.join(" ");
                    transformed.push({
                        type: ATTR,
                        value: attr,
                        row: row,
                        column: col,
                    });
                }
            } else {
                transformed.push(token);
            }
        }
        return transformed;
    }
    function eatLeft(tokens, index) {
        let token = tokens[index];
        if (token.type === LPAREN) {
            index++;
            return index;
        }
        return index;
    }
    function eatRight(tokens, index) {
        let token = tokens[index];
        if (token && token.type === RPAREN) {
            index++;
            return index;
        }
        if (!token) {
            token = tokens[index - 1];
        }
        let msg =
            "Expected '}' at row: " +
            token.row +
            " col:" +
            token.column +
            " but found '" +
            tokens.map((t) => t.value).join("") +
            "'";
        error({
            row,
            col: token.column,
            msg: msg,
            raw: tokens.map((t) => t.value).join(""),
            params: [],
        });
        return index;
    }
    function eatNumber(tokens, index) {
        let token = tokens[index];
        if (token && token.type === SPACE) {
            index++;
            token = tokens[index];
        }
        let tks = [];
        if (token && token.value.toString().match(/[0-9]/)) {
            do {
                tks.push(token);
                index++;
                token = tokens[index];
            } while (token && token.value.toString().match(/[0-9]/));
            if (token && token.type === SPACE) {
                index++;
                token = tokens[index];
            }
            return index;
        }
        let msg =
            "Integer expected at row: " +
            token.row +
            " col: " +
            token.column +
            " but found '" +
            token.value +
            "'";
        " in" + tokens.map((t) => t.value).join("");
        // error(msg, token);
        error({
            row,
            col: token.column,
            msg: msg,
            raw: tokens.map((t) => t.value).join(""),
            params: [],
        });
        return index;
    }
    function checkParam(line) {
        let current = 0;
        for (let i = 0; i < line.length; i++) {
            let token = line[i];
            // console.log({token})
            if (token.type === LPAREN) {
                i = eatLeft(line, i, current);
                i = eatNumber(line, i, current);
                i = eatRight(line, i, current);
            } else if (token.type === RPAREN) {
                // No opening parenthesis
                let msg =
                    "'}' at " +
                    token.row +
                    " col: " +
                    token.column +
                    " has no matching opening parenthesis ";

                // error(msg, token);
                error({
                    row,
                    col: token.column,
                    msg: msg,
                    raw: line.map((v) => v.value).join(""),
                    params: [],
                });
            }
        }
    }
    function tokenize(text) {
        let tokenizer = new Tokenizer();
        let raw = tokenizer.tokenize(text);
        let tokens = transform(raw);
        return tokens;
    }
    function parseLine(line, formattedLine, row) {
        let tokens = tokenize(line);

        let assign = tokens.find((t) => t.type === COLON || t.type === EQ);
        // console.log(assign.column, formattedLine.length);
        if (!assign) {
            error({
                row,
                col: tokens[0].column,
                msg: formattedLine + " is not assigned",
                raw: formattedLine,
                params: [],
            });
        } else if (assign.column === 0) {
            error({
                row,
                col: assign.column,
                msg: "No data key at row " + row,
                raw: formattedLine,
                params: [],
            });
        } else if (assign.column >= formattedLine.length - 1) {
            error({
                row,
                col: assign.column,
                msg: "No data value at row " + row,
                raw: formattedLine,
                params: [],
            });
        }
        // let assignIndex = tokens.indexOf(":");
        // if (assignIndex < 0) assignIndex = tokens.indexOf("=");
        // let lineParts = line.split(":");
        let leftTokens = tokens.filter((t) => t.column <= assign.column); // substring(0, assignIndex); // lineParts[0];
        checkParam(leftTokens);

        let rightTokens = tokens.filter((t) => t.column >= assign.column);
        checkParam(rightTokens);

        const key = leftTokens.map((token) => token.value).join("");
        if (data[key]) {
            error({
                row,
                col: token.column,
                msg:
                    "Cannot add data key '" +
                    key +
                    "' because it already exists",
                raw: formattedLine,
                params: [key],
            });
        }
        const value = rightTokens.map((token) => token.value).join("");
        data[key] = value.trim();
    }
    function parse(text) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                data = {};
                errors = [];
                const lines = text.split("\n");
                if (lines.length === 0) return;
                for (let row = 0; row < lines.length; row++) {
                    let line = lines[row];
                    let formattedLine = line.trim();
                    if (formattedLine.length === 0) continue;
                    if (formattedLine.indexOf("//") === 0) continue;
                    try {
                        parseLine(line, formattedLine, row);
                    } catch (e) {
                        console.log(e.message);
                    }
                }
                resolve(errors);
            }, 0);
        });
    }
    function compile(text) {
        return new Promise((resolve) => {
            setTimeout(async () => {
                await this.parse(text);
                // this.emit("data", { errors: errors, data: this.data });
                // data.languageModule = languageModule;
                resolve(data);
            }, 0);
        });
    }
    return {
        data,
        errors,
        parse,
        compile,
        test: function () {
            this.compile(editText).then((data) => {
                console.log({ data, errors });
            });
        },
    };
}
// ResourceParser("en", []).test();
export default ResourceParser;
