/* jshint esversion:8*/
// import CustomErrors from "./CustomErrors";
import ERROR_KEYS from "../translation/ErrorKeys";

export default class Validator {
    constructor(language, translator) {
        // this.language = language;
        // this.translator = translator;
    }

    raiseValidationError(key) {
        // return CustomErrors(this.translator, this.language).ValidationError(key)
        return key;
    }

    validateCF(input, prompt) {
        const num = input;
        if (isNaN(num)) {
            return this.raiseValidationError(ERROR_KEYS.InvalidSelection);
        }
        if (num == 0) {
            return this.raiseValidationError(ERROR_KEYS.InvalidSelection);
        } else if (num < 1) {
            return this.raiseValidationError(ERROR_KEYS.InvalidSelection);
        } else if (num > prompt.Menu.length) {
            return this.raiseValidationError(ERROR_KEYS.InvalidSelection);
        }
    }

    validateMenu(input, prompt) {
        if (input.length === 0) {
            return this.raiseValidationError(ERROR_KEYS.NoSelection);
        } else if (input.length < prompt.Min) {
            return this.raiseValidationError(ERROR_KEYS.SelectionsBelowRange);
        } else if (input.length > prompt.Max) {
            return this.raiseValidationError(ERROR_KEYS.SelectionsAboveRange);
        }

        input.forEach((num) => {
            if (isNaN(num)) {
                return this.raiseValidationError(ERROR_KEYS.InvalidSelection);
            } else if (num == 0) {
                return this.raiseValidationError(ERROR_KEYS.InvalidSelection);
            } else if (num < 0) {
                return this.raiseValidationError(ERROR_KEYS.InvalidSelection);
            } else if (num > prompt.Menu.length) {
                return this.raiseValidationError(ERROR_KEYS.InvalidSelection);
            }
        });
    }

    validateText(input, prompt) {
        if (input.length < prompt.Min) {
            return this.raiseValidationError(ERROR_KEYS.CharactersBelowRange);
        } else if (input.length > prompt.Max) {
            return this.raiseValidationError(ERROR_KEYS.CharactersAboveRange);
        }
    }

    validateNumeric(input, prompt) {
        const num = Number(input);
        if (isNaN(num)) {
            return this.raiseValidationError(ERROR_KEYS.NumberRequired);
        }

        if (!prompt.Max && !prompt.Min) return null;

        if (num < prompt.Min) {
            return this.raiseValidationError(ERROR_KEYS.NumberBelowRange);
        } else if (num > prompt.Max) {
            return this.raiseValidationError(ERROR_KEYS.NumberAboveRange);
        }
    }

    /** *
     * Validates input to the system. This is the entry point of the validation module.
     * Depending on the type of input (menu, number, text) the input is further submmitted to
     * other methods to complete the validation and return the result.
     * @param {Object} input The input text.
     * @return {String}
     */
    validate(input, prompt) {
        if (!prompt.Type) {
            return this.raiseValidationError(ERROR_KEYS.NoActiveSession);
        }
        if (!input || input.toString().trim().length === 0) {
            return this.raiseValidationError(ERROR_KEYS.NoInput);
        }
        if (prompt.Label.toUpperCase() === "CF") {
            return this.validateCF(input, prompt);
        }

        switch (prompt.Type.toUpperCase()) {
            case "MENU":
            case "YN":
            case "TF": {
                const values = input.toString().split(",");
                return this.validateMenu(values, prompt);
            }
            case "NUMBER":
                return this.validateNumeric(input, prompt);
            default:
                return this.validateText(input, prompt);
        }
    }
}
