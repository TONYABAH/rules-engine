import Parser from "./DefaultParser";
import pubsub from "./EventPubSub";
import { YN, TF, ATTR, NUMBER, MENU, TEXT, YES, NO } from "./TokenConstants";
import Prompt from "./Prompt";
import Attribute from "./Attribute";
import Inference from "./Inference";
import Goal from "./Goal";
import Condition from "./Condition";
import Expression from "./Expression";
import Menu from "./Menu";
import Rule from "./Rule";

export default class KnowledgebaseCompiler extends Parser {
    /**
     * Constructor
     * @param {String} language User language [en, fr, es, nl, de, po, ru]
     */
    constructor(language, languageModule) {
        super(language, languageModule);
        this.language = language;
        this.languageModule = languageModule;
        this.keywords = this.languageModule.keywords;
        this.title = "";
        this.summary = "";
        this.delimiter = " ";
        this.activePrompt = null;
        this.arrays = {};
        this.objects = {};
        this.goals = {};
        this.prompts = {};
        this.attributes = {};
        this.firedRules = {};
        this.answers = [];
        this.rules = [];
        this.subscriptions = [];
        this.attachListeners();
    }
    subscribe(topic, listener) {
        this.subscriptions.push(pubsub.subscribe(topic, listener));
    }
    unsubscribe() {
        this.subscriptions.forEach((subscription) => subscription.remove());
    }
    attachListeners() {
        this.subscribe("rule", (data) => this.addRule(data[0], data[1]));
        this.subscribe("inference", (data) => {
            let [name, right, alt, row] = data;
            this.addInference(name.value, right, alt, row);
        });
        this.subscribe("premise", (data) => {
            let [keyword, left, right, row, op] = data;
            return this.addPremise(keyword, left, right, op, row);
        });
        this.subscribe("condition", (data) => {
            let [keyword, left, right, row, op] = data;
            return this.addCondition(
                keyword,
                left,
                right,
                op,
                row
                // data[0], data[1][0], data[1][1], data[1][2], data[2],
            );
        });
        this.subscribe("prompt", (data) => this.addPrompt(data[0], data[1]));
        this.subscribe("question", (data) =>
            this.addQuestion(data[0], data[1])
        );
        this.subscribe("menu", (data) => this.addMenu(data[0], data[1]));
        this.subscribe("digit", (data) => this.addNumber(data[0]));
        this.subscribe("text", (data) => this.addText(data[0]));
        this.subscribe("yes-no", (data) => this.addYesNo(data[0]));
        this.subscribe("true-false", (data) => this.addTrueFalse(data[0]));
        this.subscribe("min", (data) => this.setMin(data[0], data[1]));
        this.subscribe("max", (data) => this.setMax(data[0], data[1]));
        this.subscribe("cf", () => this.setPromptCFMode());

        this.subscribe("attribute", (data) => {
            return this.setAttribute(data[0][0], data[0][1], data[1]);
        });
        this.subscribe("goal", (data) => this.addGoal(data[0], data[1]));
        this.subscribe("title", (data) => this.setTitle(data[0], data[1]));
        this.subscribe("summary", (data) =>
            this.setSummary(data[0], data[1])
        );
        this.subscribe("line", () => this.addNewLine());
        this.subscribe("done", (data) => {
             this.unsubscribe()
        });
        // event.on('eof',this.eof);
        // event.on('syntax-error',this.addText);
        // event.on('char-error',this.addText);
        // event.on('error',this.addText);
        // event.on('warning',this.addText);
        // event.on('info',this.addText);
    }
    get Data() {
        return {
            language: this.language,
            // keywords: this.keywords,
            languageModule: this.languageModule,
            line: 0,
            promptIndex: 1,
            ruleIndex: 0,
            title: this.title,
            summary: this.summary,
            delimiter: this.delimiter,
            arrays: this.arrays,
            objects: this.objects,
            goals: this.goals,
            prompts: this.prompts,
            attributes: this.attributes,
            firedRules: this.firedRules,
            answers: this.answers,
            rules: this.rules,
        };
    }
    get Keywords() {
        return this.keywords;
    }
    get Rules() {
        return this.rules;
    }

    /* get Delimeters () {
      return /Math\.[a-z]+|Math\.(E|PI)/
    }*/
    get ActiveRule() {
        return this.rules[this.rules.length - 1];
    }
    get ActiveCondition() {
        let R = this.ActiveRule;
        let condition = R.Conditions[R.Conditions.length - 1];
        return condition;
    }
    get ActivePrompt() {
        return this.activePrompt;
    }
    set ActivePrompt(p) {
        this.activePrompt = p;
    }
    setTitle(text) {
        this.title = text;
    }
    setSummary(text) {
        this.summary = text;
    }

    // Public Methods
    setMin(value) {
        if (this.ActivePrompt.Type === YN || this.ActivePrompt.Type === TF) {
            value = 1;
        }
        this.prompts[this.ActivePrompt.Name].Min = this.ActivePrompt.Min =
            value.value || value;
    }
    setMax(value) {
        if (this.ActivePrompt.Type === YN || this.ActivePrompt.Type === TF) {
            value = 1;
        }
        this.prompts[this.ActivePrompt.Name].Max = this.ActivePrompt.Max =
            value.value || value;
    }

    setPromptType(type) {
        this.ActivePrompt.Type = type;
    }
    addText() {
        this.setPromptType(TEXT);
    }
    addNumber() {
        this.setPromptType(NUMBER);
    }
    addMenu(values) {
        // let menus = values;
        this.ActivePrompt.Menu = [];
        let index = 1;
        values.forEach((value) => {
            const M = new Menu(
                index, // index
                value, // name
                value // value
            );
            this.ActivePrompt.Menu.push(M);
            index++;
        });
        this.setPromptType(MENU);
    }
    addTrueFalse() {
        // let menus = values;
        this.ActivePrompt.Menu = [];
        let index = 0;
        const values = [true, false];
        values.forEach((value) => {
            const M = new Menu(
                index, // index
                value, // name
                value // value
                // value   //display text
            );
            this.ActivePrompt.Menu.push(M);
            index++;
        });
        this.ActivePrompt.Type = TF;
        this.setMin(1);
        this.setMax(1);
    }
    addYesNo() {
        // let menus = values;
        this.ActivePrompt.Menu = [];
        let index = 0;
        const values = [this.keywords[YES], this.keywords[NO]];
        values.forEach((value) => {
            const M = new Menu(
                index, // index
                value, // name
                value // value
                // value   //display text
            );
            this.ActivePrompt.Menu.push(M);
            index++;
        });
        this.ActivePrompt.Type = YN;
        this.setMin(1);
        this.setMax(1);
    }
    addQuestion(text) {
        this.ActivePrompt.Question = text;
    }
    addPrompt(name, line) {
        const prompt = new Prompt(name.toLowerCase());
        prompt.Line = line;
        this.prompts[prompt.Name] = this.activePrompt = prompt;
        // this.addAttribute( p.Name);
    }
    setAttribute(name, value, line) {
        const a = this.addAttribute(name.toLowerCase(), line);
        a.Value = value;
    }
    addAttribute(name, line) {
        // if ( !name ) return null
        let a = this.attributes[name.toLowerCase()];
        if (a) {
            return a;
        }
        this.attributes[name.toLowerCase()] = a = new Attribute(
            name.toLowerCase()
        );
        a.Line = line;
        // this.attributes[a.Name] = a
        return a;
    }

    addInference(name, value, alternative, line) {
        const inf = new Inference(name);
        inf.Value = value; // ( value && value.value ) ? value : [{ type: 'TRUE', value: true }]
        inf.Line = line;

        if (alternative) {
            // this.R.AltInferences.push(inf)
            this.ActiveRule.AltInferences.push(inf);
        } else {
            this.ActiveCondition.Inferences.push(inf);
            // this.condition.Inferences.push( inf )
        }
        this.addAttribute(name, inf.Line);
    }
    addPremise(keyword, left, right, op, line) {
        const E = new Expression(line);
        E.Left = left;
        E.Right = right;
        E.Comparator = op;
        E.Keyword = keyword;
        E.Line = line;
        // this.condition.Premises.push(s)
        this.ActiveCondition.Premises.push(E);

        left.forEach((token) => {
            if (token && token.type === ATTR) {
                this.addAttribute(token.value, line);
            }
        });
        right.forEach((token) => {
            if (token && token.type === ATTR) {
                this.addAttribute(token.value, line);
            }
        });
    }
    addCondition(keyword, left, right, op, line) {
        const condition = new Condition();
        // this.condition = c
        //this.R.Conditions.push(c)
        this.ActiveRule.Conditions.push(condition);
        this.addPremise(keyword, left, right, op, line);
    }
    addRule(name, line) {
        const R = new Rule(name);
        R.Line = line;
        this.rules.push(R);
    }

    addGoal(name, line) {
        const G = new Goal(name.toLowerCase());
        G.Line = line;
        this.goals[G.Name] = G;
    }
    setPromptCFMode() {
        this.ActivePrompt.CFMode = true;
    }
    addObject(name, value) {
        this.objects[name.toLowerCase()] = value;
    }
    addArray(name, value) {
        this.arrays[name.tolowerCase()] = value;
    }
    setGoalCF(name, value) {
        this.goals[name.toLowerCase()].CF = value;
    }
    addNewLine() {
        // do nothing
    }
    /**
     *
     * @param { String } text Pruduction rules in plain text
     * @returns { Promise<Object> } Knowledgebase Data
     */
    compile(text) {
        return new Promise(async (resolve, reject) => {
            // let knowledgebase = new Knowledgebase(this);
            const errors = await this.parse(text);
            pubsub.publish("done-compile-knowledgebase-data", { errors: this.errors, data: this.Data });
            resolve({ errors, data: this.Data });
        });
    }
}
