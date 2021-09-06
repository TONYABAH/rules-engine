// import CustomErrors from "./CustomErrors";
import ErrorKeys from "../translation/ErrorKeys";

function raiseValidationError(code, translator, language) {
    // return CustomErrors(translator, language).ValidationError(code);
    return code;
}
/**
 *
 * @param {Array} values Values to map in the original menu
 * @param {Object} prompt The Current Prompt that has the menu
 * @param {String} language User Language (eg. en, fr, es)
 * @returns {String} Result of the map
 */
export default function multipleChoice(input, prompt) {
    // translator.target = language
    if (!input || input.length === 0) {
        return raiseValidationError(ErrorKeys.NoInput);
    }
    if (!prompt) {
        return raiseValidationError(ErrorKeys.NoActiveSession);
    }
    if (
        prompt.Type === "NUMBER" ||
        prompt.Type === "TEXT" ||
        prompt.Type === "VALUE"
    ) {
        return input && input instanceof Array ? input[0] : input;
    }
    const array = input.toString().trim().split(/,/g);
    const result = []; //array.map((v) => {
    for (let i = 0; i < array.length; i++) {
        const v = array[i];
        if (!prompt.Menu[v - 1]) {
            return raiseValidationError(ErrorKeys.InvalidSelection);
        }
        result.push(prompt.Menu[v - 1].Value);
    }
    return result.length > 0 ? result : null;
}
