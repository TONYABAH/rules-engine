import DefaultParser from "./DefaultParser";
import ResourceParser from "./ResourceParser";
import Compiler from "./KnowledgeBaseCompiler";
const defaults = { lang: "en", mode: "ace/mode/kbf" };

export default class ParserFactory {
    static createParser(language, languageModule, mode = defaults.mode) {
        // const ext = mode && mode.substring(mode.indexOf(".") + 1);
        switch (mode) {
            case "ace/mode/res":
                return new ResourceParser(language, languageModule);
            case "ace/mode/kbf":
                return new DefaultParser(language, languageModule);
            default:
                throw new Error("No parser for current mode: " + mode);
        }
    }
    static createCompiler(language, languageModule, mode = defaults.mode) {
        switch (mode) {
            case "ace/mode/res":
                return new ResourceParser(language, languageModule);
            // throw new Error("Compiler for this Mode is not yet supported");
            case "ace/mode/kbf":
                return new Compiler(language, languageModule);
            default:
                throw new Error("No compiler for current mode: " + mode);
        }
    }
}
