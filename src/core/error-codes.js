
const ErrorCodes = {
  0: "ScriptError",
  // Network errors 1-9
  1: "NotConnected",
  2: "NotReachable",
  3: "ProxyError",
  // Security Errors 10 - 19
  10: "TokenRequired",
  11: "TokenExpired",
  12: "TokenInvalid",
  13: "APIKeyNotFound",
  14: "APIKeyInvalid",
  15: "CredentialsInvalid",
  16: "UserNotFound",
  17: "AccessDenied",
// Validation errors 20 - 40
  20: "InvalidSelection",
  21: "NoSelection",
  22: "SelectionsAboveRange",
  23: "SelectionsBelowRange",
  24: "CharactersAboveRange",
  25: "CharactersBelowRange",
  26: "NumberAboveRange",
  27: "NumberBelowRange",
  28: "NumberRequired",
  29: "NoActiveSession",
  30: "NoInput",
  31: "PromptNotFound",
  32: "KnowledgebaseNotFound",
  33: "SessionExpired",

}
export default ErrorCodes
