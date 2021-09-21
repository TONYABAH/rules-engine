import Engine from "./core/InferenceEngine";
import inputValidator from "./core/InputValidator"; // Validation
import Translator from "./core/Translator";
import choice from "./core/MultipleChoice";
import languageModules from "./core/LanguageModules";
import ErrorKeys from "./translation/ErrorKeys";
import CustomErrors from "./core/CustomErrors";
import installedLanguagePlugins from "./plugins/languages";
import ParserFactory from "./core/ParserFactory";

function process(response) {
    if (response) return response;
    if (response.Label === "Prompt" || response.Label === "CF") {
        //Prompting for input
        return { type: "prompt", data: response };
    } else if (response instanceof Array) {
        //answers are ready
        return { type: "answers", data: response };
    } else {
        return response;
    }
}
function raiseValidationError(code, translator, systemLanguage) {
    const err = CustomErrors(translator, systemLanguage).ValidationError(code);
    return err;
}
function raiseSecurityError(key, translator, systemLanguage) {
    const err = CustomErrors(translator, systemLanguage).SecurityError(key);
    return err;
}
export class Rules {
    constructor(systemLanguage, mode = "ace/mode/kbf") {
        this.systemLanguage = systemLanguage;
        this.languageModule = languageModules[systemLanguage];

        this.compiler = ParserFactory.createCompiler(
            systemLanguage,
            this.languageModule,
            mode
        );
        this.parser = ParserFactory.createParser(
            systemLanguage,
            this.languageModule,
            mode
        );
        this.translator = new Translator(systemLanguage, this.languageModule);
        // InputValidator(systemLanguage, this.translator);
    }
    static registerLanguage(lang, data) {
        if (!arguments) {
            throw new Error("Language name required");
        }
        if (typeof lang !== "string") {
            throw new Error("Expected language code as first argument");
        }
        if (typeof data !== "object") {
            throw new Error("Expected language data as second argument");
        }
        const language = lang.toLocaleLowerCase();
        if (arguments.length < 2) {
            throw new Error(
                "Two arguments expected: Language name and data are required"
            );
        }
        if (!data) {
            throw new Error("Language data required");
        }
        if (typeof language !== "string") {
            throw new Error("Language name should be a String");
        }
        if (language.length > 2) {
            throw new Error("Language code should contain only two characters");
        }
        if (!language.match(/[a-z][a-z]/)) {
            throw new Error("Unknown character in language code");
        }
        if (languageModules[language]) {
            throw new Error(language + " Language already installed");
        }
        languageModules[language] = data;
    }

    static init(installLanguageModules) {
        try {
            installLanguageModules &&
                installLanguageModules.forEach((l) => {
                    const data = installedLanguagePlugins[l];
                    if (data) {
                        Rules.registerLanguage(l, data);
                        console.log("Enabled language: " + l);
                    } else {
                        console.error("Locale not installed: " + l);
                    }
                });
        } catch (e) {
            console.log(e);
        }
    }

    getKeywords() {
        return this.languageModule.keywords;
    }
    async parse(codes) {
        const errors = await this.parser.parse(codes);
        return errors;
    }
    async compile(codes) {
        const { errors, data } = await this.compiler.compile(codes);
        return { errors, data };
    }
    run(freshData) {
        if (!freshData) {
            return raiseValidationError(
                ErrorKeys.KnowledgebaseNotFound,
                this.translator,
                this.systemLanguage
            );
        }
        let response = new Engine(freshData).run();
        return response;
        // return process(response);
    }
    reply(modifiedData, input) {
        if (!modifiedData) {
            return raiseValidationError(
                ErrorKeys.KnowledgebaseNotFound,
                this.translator,
                this.systemLanguage
            );
        }
        if (!input || input.toString().trim().length === 0) {
            return raiseValidationError(
                ErrorKeys.NoInput,
                this.translator,
                this.systemLanguage
            );
        }
        let response = new Engine(
            modifiedData,
            this.translator,
            this.validator
        ).input(input);
        return process(response);
    }
    validate(input, prompt) {
        return inputValidator.validate(input, prompt);
    }
    choice(input, prompt) {
        return choice(input, prompt, this.systemLanguage);
    }
    translate(code, to) {
        return this.translator.translate(code, to);
    }
    translatePlain(text, to, from) {
        return this.translator.translatePlain(text, to, from);
    }
}
export default Rules;
