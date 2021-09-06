/* jshint esversion:8*/
// import CustomErrors from "./CustomErrors";
import ERROR_KEYS from "../translation/ErrorKeys";

const validator = (function () {
    /**
     * Method just returns the error code which should be handled by the consuming function.
     * Normally the code should be translated to user language based on the locale.
     * @param { String } key Error code
     * @returns the Error code
     */
    function raiseValidationError(key) {
        // return CustomErrors(translator, language).ValidationError(key)
        return key;
    }

    function validateCF(input, prompt) {
        const num = input;
        if (isNaN(num)) {
            return raiseValidationError(ERROR_KEYS.InvalidSelection);
        }
        if (num == 0) {
            return raiseValidationError(ERROR_KEYS.InvalidSelection);
        } else if (num < 1) {
            return raiseValidationError(ERROR_KEYS.InvalidSelection);
        } else if (num > prompt.Menu.length) {
            return raiseValidationError(ERROR_KEYS.InvalidSelection);
        }
    }

    function validateMenu(input, prompt) {
        if (input.length === 0) {
            return raiseValidationError(ERROR_KEYS.NoSelection);
        } else if (input.length < prompt.Min) {
            return raiseValidationError(ERROR_KEYS.SelectionsBelowRange);
        } else if (input.length > prompt.Max) {
            return raiseValidationError(ERROR_KEYS.SelectionsAboveRange);
        }

        input.forEach((num) => {
            if (isNaN(num)) {
                return raiseValidationError(ERROR_KEYS.InvalidSelection);
            } else if (num == 0) {
                return raiseValidationError(ERROR_KEYS.InvalidSelection);
            } else if (num < 0) {
                return raiseValidationError(ERROR_KEYS.InvalidSelection);
            } else if (num > prompt.Menu.length) {
                return raiseValidationError(ERROR_KEYS.InvalidSelection);
            }
        });
    }

    function validateText(input, prompt) {
        if (input.length < prompt.Min) {
            return raiseValidationError(ERROR_KEYS.CharactersBelowRange);
        } else if (input.length > prompt.Max) {
            return raiseValidationError(ERROR_KEYS.CharactersAboveRange);
        }
    }

    function validateNumeric(input, prompt) {
        const num = Number(input);
        if (isNaN(num)) {
            return raiseValidationError(ERROR_KEYS.NumberRequired);
        }

        if (!prompt.Max && !prompt.Min) return null;

        if (num < prompt.Min) {
            return raiseValidationError(ERROR_KEYS.NumberBelowRange);
        } else if (num > prompt.Max) {
            return raiseValidationError(ERROR_KEYS.NumberAboveRange);
        }
    }
    return {
        /** *
         * Validates input to the system. This is the entry point of the validation module.
         * Depending on the type of input (menu, number, text) the input is further submmitted to
         * other methods to complete the validation and return the result.
         * @param {Object} input The input text.
         * @param {OBJECT} prompt The prompt presented to the user for response.
         * @return Error code if validation fails, or nothing.
         */
        validate(input, prompt) {
            if (!prompt.Type) {
                return raiseValidationError(ERROR_KEYS.NoActiveSession);
            }
            if (!input || input.toString().trim().length === 0) {
                return raiseValidationError(ERROR_KEYS.NoInput);
            }
            if (prompt.Label.toUpperCase() === "CF") {
                return validateCF(input, prompt);
            }

            switch (prompt.Type.toUpperCase()) {
                case "MENU":
                case "YN":
                case "TF": {
                    const values = input.toString().split(",");
                    return validateMenu(values, prompt);
                }
                case "NUMBER":
                    return validateNumeric(input, prompt);
                default:
                    return validateText(input, prompt);
            }
        },
    };
})();

export default validator;
