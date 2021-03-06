import pubsub from "./EventPubSub";
import {
    RULE,
    ELSE,
    ELSEIF,
    THEN,
    AND,
    OR,
    IF,
    PROMPT,
    QUESTION,
    MENU,
    LINE,
    ATTR,
    /* CF, DIGIT, YES, NO, TRUE, FALSE, NUM, MIN, MAX, ARRAY, ATTR, CONST, FUNC,
  ATTRIBUTE, TITLE, SUMMARY, GOAL, LINE, ERROR, EOF, LPAREN, RPAREN, TIMES,
  COMMA, GT, LT, EQ, TEXT, NOT, IN, EX, IS, REM, COMMENT, SPACE, MOD, LBRACKET, CARRET, */
} from "./TokenConstants";

const ParseToken = function (self) {
    return {
        rule(token) {
            if (
                self.prev === null ||
                self.prev === MENU ||
                self.prev === THEN ||
                self.prev === ELSE ||
                self.prev === AND
            ) {
                self.prev = RULE;
                const r = self.scanRule();
                pubsub.publish("rule", [r, self.row], this);
                return true;
            }
        },
        if() {
            if (self.prev === RULE) {
                self.prev = IF;
                const p = self.scanPremise();
                if (!p) return;
                const { left, right, op } = p;
                pubsub.publish("condition", [IF, left, right, self.row, op], this);
                return true;
            }
        },
        or() {
            if (
                self.prev === IF ||
                self.prev === ELSEIF ||
                self.prev === OR ||
                self.prev === AND
            ) {
                self.prev = OR;
                const p = self.scanPremise();
                if (!p) return;
                const { left, right, op } = p;
                pubsub.publish("premise", [OR, left, right, self.row, op], this);
                return true;
            }
        },
        and() {
            if (
                self.prev === IF ||
                self.prev === ELSEIF ||
                self.prev === THEN ||
                self.prev === ELSE ||
                self.prev === AND
            ) {
                self.prev = AND;
                if (self.prev === THEN) {
                    const p = self.scanInference();
                    if (!p) return;
                    const { name, right } = p;
                    pubsub.publish(
                        "inference",
                        [name, right, false, self.row],
                        this
                    );
                    return true;
                } else if (self.prev === ELSE) {
                    const p = self.scanInference();
                    if (!p) return;
                    const { name, right } = p;
                    pubsub.publish(
                        "inference",
                        [name, right, false, self.row],
                        this
                    );
                    return true;
                } else {
                    const p = self.scanPremise();
                    if (!p) return;
                    const { left, right, op } = p;
                    pubsub.publish(
                        "premise",
                        [AND, left, right, self.row, op],
                        this
                    );
                    return true;
                }
            }
        },
        then(token) {
            // console.log(self.prev, token)
            if (
                self.prev === IF ||
                self.prev === ELSEIF ||
                self.prev === OR ||
                self.prev === AND
            ) {
                self.prev = THEN;
                const p = self.scanInference();
                if (!p) return false;
                const { name, right } = p;
                pubsub.publish("inference", [name, right, false, self.row], this);
                return true;
            }
        },
        elseif(token) {
            if (self.prev === THEN || self.prev === AND || self.prev === ELSE) {
                self.prev = ELSEIF;
                // console.log(token)
                const p = self.scanPremise();
                if (!p) return;
                const { left, right, op } = p;
                pubsub.publish(
                    "condition",
                    [ELSEIF, left, right, self.row, op],
                    this
                );
                return true;
            }
        },
        else() {
            if (self.prev === THEN || self.prev === AND) {
                self.prev = ELSE;
                const f = self.scanInference();
                if (!f) return;
                const { name, right } = f;
                pubsub.publish("inference", [name, right, true, self.row], this);
                return true;
            }
        },
        prompt() {
            if (
                self.prev === null ||
                self.prev === MENU ||
                self.prev === THEN ||
                self.prev === ELSE
            ) {
                self.prev = PROMPT;
                const p = self.scanPrompt();
                pubsub.publish("prompt", [p, self.row], this);
                return true;
            }
        },
        question() {
            if (self.prev === PROMPT) {
                self.prev = QUESTION;
                const q = self.scanQuestion();
                pubsub.publish("question", [q, self.row], this);
                return true;
            }
        },
        menu() {
            if (self.prev === QUESTION) {
                self.prev = MENU;
                const m = self.scanMenu();
                pubsub.publish("menu", [m, self.row], this);
                return this;
            }
        },
        digit() {
            if (self.prev === QUESTION) {
                self.prev = MENU;
                self.scanDigit();
                pubsub.publish("digit", [self.row], this);
                return true;
            }
        },
        text() {
            if (self.prev === QUESTION) {
                self.prev = MENU;
                self.scanText();
                pubsub.publish("text", [self.row], this);
                return true;
            }
        },
        yes() {
            if (self.prev === QUESTION) {
                self.prev = MENU;
                self.scanYesNo();
                pubsub.publish("yes-no", [self.row], this);
                return true;
            }
        },
        true() {
            if (self.prev === QUESTION) {
                self.prev = MENU;
                self.scanTrueFalse();
                pubsub.publish("true-false", [self.row], this);
                return true;
            }
        },
        min() {
            if (self.prev === MENU) {
                const min = self.scanMin();
                // self.pos--
                if (min) {
                    pubsub.publish("min", [min, self.row], this);
                }
                return true;
            }
        },
        max() {
            if (self.prev === MENU) {
                const max = self.scanMax();
                // self.pos--
                if (max) {
                    pubsub.publish("max", [max, self.row], this);
                }
                return true;
            }
        },
        cf() {
            if (self.prev === MENU) {
                pubsub.publish("cf", [self.row], this);
                return true;
            }
        },
        mod() {
            if (self.prev === MENU) {
                pubsub.publish("cf", [self.row], this);
                return true;
            }
        },
        attribute() {
            const attribute = self.scanAttribute();
            pubsub.publish("attribute", [attribute, self.row], this);
            return true;
        },
        goal(token) {
            if (
                self.prev === null ||
                self.prev === MENU ||
                self.prev === THEN ||
                self.prev === ELSE
            ) {
                if (self.lastToken.type === LINE) {
                    const goal = self.scanGoal();
                    if (goal) {
                        pubsub.publish("goal", [goal, self.row], this);
                    }
                    return true;
                }
            }
        },
        array() {
            if (
                self.prev === null ||
                self.prev === MENU ||
                self.prev === THEN ||
                self.prev === ELSE
            ) {
                const array = self.scanArray();
                pubsub.publish("array", [array, self.row], this);
                return true;
            }
        },
        title() {
            if (self.prev === null) {
                const title = self.scanTitle();
                pubsub.publish("title", [title, self.row], this);
                return true;
            }
        },
        summary() {
            if (self.prev === null) {
                const summary = self.scanSummary();
                pubsub.publish("summary", [summary, self.row], this);
                return true;
            }
        },
        line() {
            pubsub.publish("line", [self.row], this);
            return true;
        },
        eof() {
            // End of file
            pubsub.publish("eof", [self.row], this);
            return true;
        },
        error(token) {
            self.error("Unknown character or token: " + token.value, token);
            return true;
        },
    };
};
export default ParseToken;
