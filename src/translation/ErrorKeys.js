
const ErrorKeys = {
  ScriptError: "ScriptError", //0
  // Network errors 1 - 9
  NetworkError: 'NetworkError', //1
  // Security Errors 10 - 19
  TokenRequired: "TokenRequired", //10
  TokenExpired: "TokenExpired", //11
  TokenInvalid: "TokenInvalid", //12
  APIKeyNotFound: "APIKeyNotFound", //13
  APIKeyInvalid: "APIKeyInvalid", //14
  CredentialsInvalid: "CredentialsInvalid", //15
  UserNotFound: "UserNotFound", //16
  AccessDenied: "AccessDenied", //17
  // Validation Errors 20 - 40
  InvalidSelection: "InvalidSelection", //20
  NoSelection: "NoSelection", //21 
  SelectionsAboveRange: "SelectionsAboveRange", //22
  SelectionsBelowRange: "SelectionsBelowRange", //23
  CharactersAboveRange: "CharactersAboveRange", //24
  CharactersBelowRange: "CharactersBelowRange", //25
  NumberAboveRange: "NumberAboveRange", //26
  NumberBelowRange: "NumberBelowRange", //27
  NumberRequired: "NumberRequired", //28
  NoActiveSession: "NoActiveSession", //29
  NoInput: "NoInput", //30
  PromptNotFound: "PromptNotFound", //31
  KnowledgebaseNotFound: "KnowledgebaseNotFound", //32 
  SessionExpired: "SessionExpired", //33
  // Syntax Errors
  UnknownToken: 'UnknownToken',
  NoCloseParenthesis: 'NoCloseParenthesis',
  NoOpenParenthesis: 'NoOpenParenthesis',
  DuplicateOperator: 'DuplicateOperator',
  NoDefinition: 'NoDefinition',
  NoAttributeName: 'NoAttributeName',
  ExpectedEQ: 'ExpectedEQ',
  ExpectNoEOF: 'ExpectNoEOF',
  ExpectNoNewLine: 'ExpectNoNewLine',
  ExpectedArrayname: 'ExpectedArrayname',
  ExpectedOpenParenthesis: 'ExpectedOpenParenthesis',
  ExpectedNumberOrAttrib: 'ExpectedNumberOrAttrib',
  ExpectedComma: 'ExpectedComma',
  ExpectedCloseParenthesis: 'ExpectedCloseParenthesis',
  NoGoalName: 'NoGoalName',
  NoPromptText: 'NoPromptText',
  ExpectType: 'ExpectType',
  ExpectComparator: 'ExpectComparator',
  NoInputForAttrib: 'NoInputForAttrib',
  
}
export default ErrorKeys
