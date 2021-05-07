
export default {

  ScriptError: "Une erreur du moteur de script s'est produite", // 0

  // Erreurs réseau
  NetworkError: "La réponse n'était pas correcte", // 1

  // Erreurs de sécurité 10 - 19
  TokenRequired: "Jeton d'authentification introuvable", // 10
  TokenExpired: "Le jeton d'authentification a expiré", // 11
  TokenInvalid: "Le jeton d'authentification n'est pas valide", // 12
  APIKeyNotFound: "Clé API introuvable", // 13
  APIKeyInvalid: "Clé API invalide", // 14
  CredentialsInvalid: "Informations d'identification fournies non valides", // 15
  UserNotFound: "Utilisateur absent de la base de données", // 16
  AccessDenied: "Accès refusé", // 17

  // Erreurs de validation 20 - 39
  InvalidSelection: "L'élément de menu sélectionné n'existe pas", // 20
  NoSelection: "Aucune sélection n'a été effectuée", // 21
  SelectionsAboveRange: "Sélections au-dessus de la plage", // 22
  SelectionsBelowRange: "Sélections inférieures à la plage", // 23
  CharactersAboveRange: "Caractères au-dessus de la plage", // 24
  CharactersBelowRange: "Caractères en dessous de la plage", // 25
  NumberAboveRange: "L'entrée numérique est au-dessus de la plage", // 26
  NumberBelowRange: "L'entrée numérique est inférieure à la plage", // 27
  NumberRequired: "Une saisie numérique est requise", // 28
  NoActiveSession: "Aucune session active", // 29
  NoInput: "Aucune entrée reçue", // 30
  PromptNotFound: "Aucune invite de ce type", // 31
  KnowledgebaseNotFound: "La base de connaissances est introuvable", // 32
  SessionExpired: "La session a expiré", // 33

  // Erreurs de base de données 40-49
}
