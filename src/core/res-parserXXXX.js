// import CustomEvent from './events.js'
// import { Token } from './symbols.js'
import CustomEvent from "./CustomEvent";
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

import Tokenizer from "./ResourceLexer";

export default class Parser extends CustomEvent {
    constructor(language, languageModule) {
        super();
        this.language = language;
        this.keywords = languageModule.keywords;
        this.errors = [];
        this.data = {};
    }
    get Data() {
        return this.data;
    }
    get Error() {
        return this.errors;
    }

    error(msg, token, flag = "error") {
        const e = {
            type: flag, // "error"|"warning"|"info"
            row: token.row, // row index
            column: token.column, // character index on line
            text: msg, // Error message
            raw: token, // "Missing semicolon"
        };
        this.errors.push(e);
    }
    static filterComment(tokens) {
        return tokens.filter(
            (token) => token.type !== REM && token.type !== COMMENT
        );
    }
    transform(tokens) {
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

    eatKey(tokens, current, row, fn) {
        let values = [];
        let count = current;
        let token = tokens[count];
        let comment = false;
        while (
            token &&
            token.value !== "" &&
            token.value !== "=" &&
            token.value !== "\n"
        ) {
            if (token.type !== REM) {
                values.push(token);
            } else {
                comment = true;
            }
            count++;
            token = tokens[count];
        }
        if (values.length > 0) {
            if (token && (token.type === LINE || token.type === EOF)) {
                if (!comment) {
                    fn(
                        "Key not assigned: " +
                            values.map((v) => v.value).join(""),
                        token
                    );
                }
            }
            this.checkParam(values, current);
            return [count, values];
        }
        let line = tokens
            .filter((tk) => tk.row === row)
            .map((v) => v.value)
            .join("");
        if (!comment && line) {
            fn(
                "Key not found: " + line,
                tokens.filter((tk) => tk.row === row)[0]
            );
        }
        return [0, null];
    }
    eatValue(tokens, current, row, fn) {
        let values = [];
        let count = current;
        let token = tokens[current];
        while (token && token.value !== "" && token.value !== "\n") {
            if (token.type === EQ) {
                fn("Duplicate assignment", token);
            }
            if (token.type !== REM) {
                values.push(token);
            }
            count++;
            token = tokens[count];
        }

        if (values.length > 0) {
            this.checkParam(values, count);
            return [count, values];
        } else if (token && (token.type === LINE || token.type === EOF)) {
            let line = tokens
                .filter((tk) => tk.row === row)
                .map((v) => v.value)
                .join("");
            fn("Value not found: " + line, token);
            return [0, null];
        }
        return [0, null];
    }
    eatColon(tokens, current, row, fn) {
        let values = [];
        let count = current;
        let token = tokens[count];
        if (!token) return [0, null];
        if (token.type !== COLON) {
            fn("Expected ':' but got " + token.value, count, token);
            return [];
        }
        values.push(token);
        count++;
        return [count, token];
    }
    eatLeft(tokens, index) {
        let token = tokens[index];
        if (token.type === LPAREN) {
            index++;
            return index;
        }
        return index;
    }
    eatRight(tokens, index) {
        let token = tokens[index];
        if (token && token.type === RPAREN) {
            index++;
            return index;
        }
        if (!token) {
            token = tokens[index - 1];
        }
        let msg =
            "Closing parentesis expected at row: " +
            token.row +
            " col:" +
            token.column +
            " in" +
            tokens.map((t) => t.value).join("");
        this.error(msg, token);
        return index;
    }
    eatNumber(tokens, index) {
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
            " in" +
            tokens.map((t) => t.value).join("");
        this.error(msg, token);
        return index;
    }
    checkParam(line, current) {
        for (let i = 0; i < line.length; i++) {
            let token = line[i];
            if (token.type === LPAREN) {
                i = this.eatLeft(line, i, current);
                i = this.eatNumber(line, i, current);
                i = this.eatRight(line, i, current);
            } else if (token.type === RPAREN) {
                // No opening parenthesis
                let msg =
                    "Closing parenthesis has no matching opening parenthesis at row: " +
                    token.row +
                    " col: " +
                    token.col +
                    " " +
                    line.map((v) => v.value).join("");
                this.error(msg, token);
            }
        }
    }
    parseTokens(tokens) {
        let row = 0;
        var handleError = (err, token) => {
            this.error(err, token);
        };
        for (let index = 0; index < tokens.length; index++) {
            let token = tokens[index];
            let type = token.type;
            let value = token.value;

            switch (type) {
                case REM:
                    break;
                case EOF:
                    break;
                case SPACE:
                    break;
                case LINE:
                    index++;
                    row++;
                    //col = 0
                    var [keyCount, keyValues] = this.eatKey(
                        tokens,
                        index,
                        row,
                        handleError
                    );
                    index = keyCount;
                    var [colonCount, colonValue] = this.eatColon(
                        tokens,
                        index,
                        row,
                        handleError
                    );
                    index = colonCount;
                    var [valCount, valueValues] = this.eatValue(
                        tokens,
                        index,
                        row,
                        handleError
                    );
                    index = valCount;
                    if (!keyValues) break;
                    let keys = keyValues.map((k) => k.value);
                    if (!valueValues) break;
                    let values = valueValues.map((v) => v.value);
                    let key = keys.join(" ");
                    if (this.Data[key]) {
                        handleError("Key already exist in data: " + key, token);
                    }
                    this.Data[keys.join(" ")] = values.join(" ");
                    // eat key
                    break;
                default:
                    handleError("Invalid character or token: " + value, token);
            }
            // col++
        }
        return this.Error;
    }
    parseLineTokens(tokens, row) {
        // let row = 0;
        var handleError = (err, token) => {
            this.error(err, token);
            throw Error(err);
        };
        // for (let index = 0; index < tokens.length; index++) {
        let index = 0;
        let token = tokens[0];
        let type = token.type;
        token.row = row;
        // token.column = index;
        // if (!token) continue;
        switch (type) {
            case REM:
                break;
            case EOF:
                break;
            case SPACE:
                break;
            default:
                // index++;
                var [keyCount, keyValues] = this.eatKey(
                    tokens,
                    index,
                    row,
                    handleError
                );
                index += keyCount;
                var [colonCount, colonValue] = this.eatColon(
                    tokens,
                    index,
                    row,
                    handleError
                );
                index += colonCount;
                var [valCount, valueValues] = this.eatValue(
                    tokens,
                    index,
                    row,
                    handleError
                );
                index += valCount;
                if (!keyValues) break;
                let keys = keyValues.map((k) => k.value);
                if (!valueValues) break;
                let values = valueValues.map((v) => v.value);
                let key = keys.join(" ");
                if (this.Data[key]) {
                    handleError("Key already exist in data: " + key, token);
                }
                this.Data[keys.join(" ")] = values.join(" ");
                break;
        }
        // col++
        // }
        return this.Error;
    }
    parse(text, row) {
        return new Promise(async (resolve, reject) => {
            let tokenizer = new Tokenizer();
            let raw = tokenizer.tokenize(text);
            let tokens = this.transform(raw);
            let errors = [];
            try {
                errors = this.parseLineTokens(tokens, row);
                // console.log(errors, this.data);
            } catch (e) {
                console.log(e.message);
            } finally {
                resolve(this.errors);
            }
        });
    }
    async compile(text) {
        return new Promise(async (resolve, reject) => {
            const lines = text.split("\n");
            let row = -1;
            lines.forEach(async (lineText) => {
                row++;
                await this.parse(lineText, row);
            });
            // const errors = (this.errors = await this.parse(text));
            this.emit("data", { errors: this.errors, data: this.data });
            this.data.languageModule = this.languageModule;
            resolve({ errors: this.errors, data: this.data });
        });
    }
}
