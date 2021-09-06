export default {
  keywords: {
    LANGUAGE: 'langue',
    TITLE: 'titre',
    SUMMARY: 'résumé',
    ATTRIBUTE: 'attribut',
    ARRAY: 'tableau',
    OOBJECT: 'objet',
    GOAL: 'objetif',
    REM: 'rem',
    COMMENT: 'commentaire',
    RULE: 'règle',
    IF: 'si',
    AND: 'et',
    OR: 'ou',
    THEN: 'puis',
    ELSEIF: 'elseif',
    ELSE: 'autre',
    PROMPT: 'contribution',
    QUESTION: 'question',
    MENU: 'menu',
    DIGIT: 'Numéro',
    TEXT: 'texte',
    CF: '%',
    LOAD: 'charge',
    IS: 'est',
    IN: 'dans',
    INCLUDE: 'comprendre',
    EXCLUDE: 'exclure',
    TRUE: 'vrai',
    FALSE: 'faux',
    MIN: 'min',
    MAX: 'max',
    YES: 'oui',
    NO: 'pas',
    // FOLD_SETTING:			fold.fr,
    // PROMPT_SETTING:		prompt.fr
  },
  prompts: {
    CODE: 'fr',
    NAME: 'Français',
    QUES: 'Quelle est votre réponse?',
    CF_TEXTS: ['Absolument sûr', 'Très sûr', 'Bien sûr', 'Pas si sûr', 'Pas sûr'],
    VALUES: [99, 95, 80, 75, 60],
    ALPHA: ['A', 'B', 'C', 'D', 'E'],
  },
  errors: {
    ScriptError : "Une erreur du moteur de script s'est produite", //0
    // Erreurs réseau
    NetworkError : "La réponse n'était pas ok", //1
    // Erreurs de sécurité 10 - 19
    TokenRequired : "Jeton d'authentification non trouvé", //10
    TokenExpired : "Le jeton d'authentification a expiré", //11
    TokenInvalid : "Le jeton d'authentification n'est pas valide", //12
    APIKeyNotFound : "Clé API non trouvée", //13
    APIKeyInvalid : "Clé API invalide", //14
    CredentialsInvalid : "Informations d'identification fournies invalides", //15
    UserNotFound : "Utilisateur absent de la base de données", //16
    AccessDenied : "Accès refusé", //17
    // Erreurs de validation 20 - 39
    InvalidSelection : "L'élément de menu sélectionné n'existe pas", //20
    NoSelection : "Aucune sélection n'a été effectuée", //21
    SelectionsAboveRange : "Sélections au-dessus de la plage", //22
    SelectionsBelowRange : "Sélections en dessous de la plage", //23
    CharactersAboveRange : "Caractères au-dessus de la plage", //24
    CharactersBelowRange : "Caractères inférieurs à la plage", //25
    NumberAboveRange : "Le nombre saisi est au-dessus de la plage", //26
    NumberBelowRange : "Le nombre saisi est inférieur à la plage", //27
    NumberRequired : "La saisie du numéro est requise", //28
    NoActiveSession : "Aucune session active", //29
    NoInput : "Aucune entrée reçue", // 30
    PromptNotFound: "Aucune telle invite", //31
    KnowledgebaseNotFound : "La base de connaissances n'a pas été trouvée", //32
    SessionExpired : "La session a expiré", //33
    ValidationError: "Erreur de validation", //39
    // Erreurs de base de données 40 - 49
    // Erreurs de syntaxe
    UnknownToken : 'Caractère ou jeton inconnu : {0}',
    NoCloseParenhesis : 'Open Parenhesis \'{0}\' à la colonne \'{1}\'a pas de parenthèse fermée',
    NoOpenParenhesis : 'Fermer la parenthèse \'{0}\' à la colonne\' {1}\'a pas de parenthèse ouvrante',
    DuplicateOperator : 'DuplicateOperator \'{0}\' \'{1}\'',
    NoDefinition : '{0} la définition doit avoir des textes',
    NoAttributeName : 'La définition d\'attribut doit avoir un nom d\'attribut',
    ExpectedEQ : 'Attendu \'=\'',
    ExpectNoEOF : 'Expression attendue mais fin de fichier trouvée',
    ExpectNoNewLine : 'Expression attendue mais nouvelle ligne trouvée',
    ExpectedArrayname : 'Nom du tableau attendu',
    AttenduOuvertParenthèse : 'attendu \'(\'',
    ExpectedNumberOrAttrib : 'Numéro ou attribut attendu',
    ExpectedComma : 'Attendu \',\'',
    ExpectedCloseParenhesis : 'Attendu ) mais nouvelle ligne trouvée',
    NoGoalName : 'La définition de l\'objectif doit avoir des textes',
    NoPromptText : 'La définition de l\'invite doit avoir des textes',
    ExpectType : 'Attendu \'{0}\' mais trouvé \'{1}\'',
    ExpectComparator : 'Comparateur attendu mais trouvé \'{0}\' \'{1}\'',
    NoInputForAttrib : 'Aucune invite de saisie pour l\'attribut \'{0}\'',
  }
}
