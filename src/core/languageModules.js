export const en = {
  keywords: {
    LANGUAGE: 'language',
    TITLE: 'title',
    SUMMARY: 'summary',
    ATTRIBUTE: 'attribute',
    ARRAY: 'array',
    OBJECT: 'object',
    GOAL: 'goal',
    REM: 'rem',
    COMMENT: 'comment',
    RULE: 'rule',
    IF: 'if',
    AND: 'and',
    OR: 'or',
    THEN: 'then',
    ELSEIF: 'else if',
    ELSE: 'else',
    PROMPT: 'prompt',
    QUESTION: 'question',
    MENU: 'menu',
    DIGIT: 'DIGIT',
    TEXT: 'text',
    CF: '%',
    LOAD: 'load',
    // IS: 'is',
    // IN: 'in',
    INCLUDE: 'include',
    EXCLUDE: 'exclude',
    TRUE: 'true',
    FALSE: 'false',
    MIN: 'min',
    MAX: 'max',
    YES: 'yes',
    NO: 'no',
    // FOLD_SETTING:			fold.en,
    // PROMPT_SETTING:		prompt.en
  },
  prompts: {
    CODE: 'en',
    NAME: 'English',
    QUES: 'How sure about your answer?',
    CF_TEXTS: ['Absolutely sure', 'Very sure', 'Sure', 'Not so sure', 'Not sure'],
    VALUES: [99, 95, 80, 75, 60],
    ALPHA: ['A', 'B', 'C', 'D', 'E'],
  },
  errors: {
    ScriptError: "Scripting Engine Error has occured", //0
    // Network errors
    NetworkError: "The response was not ok", //1
    // Security Errors 10 - 19
    TokenRequired: "Auth token not found", //10
    TokenExpired: "Auth token has expired", //11
    TokenInvalid: "Auth token is invalid", //12
    APIKeyNotFound: "API key not found", //13
    APIKeyInvalid: "API key invalid", //14
    CredentialsInvalid: "Supplied credentials invalid", //15
    UserNotFound: "User not in database", //16
    AccessDenied: "Access denied", //17
    // Validation Errors 20 - 39
    InvalidSelection: "Selected menu item does not exist", //20
    NoSelection: "No selection was made", //21
    SelectionsAboveRange: "Selections above range", //22
    SelectionsBelowRange: "Selections below range", //23
    CharactersAboveRange: "Characters above range", //24
    CharactersBelowRange: "Characters below range", //25
    NumberAboveRange: "Number input is above range", //26
    NumberBelowRange: "Number input is below range", //27
    NumberRequired: "Number input is required", //28
    NoActiveSession: "No active session", //29
    NoInput: "No input received", // 30
    PromptNotFound: "No such prompt", //31
    KnowledgebaseNotFound: "Knowledge base was not found", //32 
    SessionExpired: "Session has expired", //33
    ValidationError: "Validation error", //39
    // Database Errors 40 - 49
    // Syntax Errors
    UnknownToken: 'Unknown character or token: {0}',
    NoCloseParenthesis: 'Open Parenthesis \'{0}\' at column {1} has no close Parenthesis',
    NoOpenParenthesis: 'Close Parenthesis \'{0}\' at column {1} has no opening Parenthesis',
    DuplicateOperator: 'Duplicate operator \'{0}\' \'{1}\'',
    NoDefinition: '{0} definition should have texts',
    NoAttributeName: 'Attribute definition should have Attribute Name',
    ExpectedEQ: 'Expected \'=\'',
    ExpectNoEOF: 'Expected expression but found end of file',
    ExpectNoNewLine: 'Expected expression but found new line',
    ExpectedArrayname: 'Expected array name',
    ExpectedOpenParenthesis: 'Expected \'(\'',
    ExpectedNumberOrAttrib: 'Expected number or Attribute',
    ExpectedComma: 'Expected \',\'',
    ExpectedCloseParenthesis: 'Expected ) but found new line',
    NoGoalName: 'Goal definition should have texts',
    NoPromptText: 'Prompt definition should have texts',
    ExpectType: 'Expected \'{0}\' but found \'{1}\'',
    ExpectComparator: 'Expected comparator but found \'{0}\' \'{1}\'',
    NoInputForAttrib: 'No input prompt for attribute \'{0}\'',
  }  
}
export default {
  en,
}

