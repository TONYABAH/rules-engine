export default {
  keywords: {
    LANGUAGE: 'Sprache',
    TITLE: 'Titel',
    SUMMARY: 'Zusammenfassung',
    ATTRIBUTE: 'Attribut',
    ARRAY: 'Array',
    OBJECT: 'Objekt',
    GOAL: 'Zeil',
    REM: 'rem',
    COMMENT: 'Kommentar',
    RULE: 'Regel',
    IF: 'wenn',
    AND: 'und',
    OR: 'oder',
    THEN: 'dann',
    ELSEIF: 'sonst wenn',
    ELSE: 'sonst',
    PROMPT: 'prompt',
    QUESTION: 'Frage',
    MENU: 'Menü',
    DIGIT: 'ZIFFER',
    TEXT: 'Text',
    CF: '%',
    LOAD: 'laden',
    // IS: 'ist',
    // IN: 'ein',
    INCLUDE: 'einschließen',
    EXCLUDE: 'ausschließen',
    TRUE: 'wahr',
    FALSE: 'falsch',
    MIN: 'min',
    MAX: 'maximal',
    YES: 'ja',
    NO: 'Nein',
  },
  prompts: {
    CODE: 'de',
    NAME: 'Deutsche',
    QUES: 'Wie sicher ist Ihre Antwort?',
    CF_TEXTS: ['Absolut sicher', 'Sehr sicher', 'Sicher', 'Nicht so sicher', 'Nicht sicher'],
    VALUES: [99, 95, 80, 75, 60],
    ALPHA: ['A', 'B', 'C', 'D', 'E'],
  },
  errors: {
    ScriptError: "Fehler bei der Skript-Engine ist aufgetreten", //0
    	// Netzwerkfehler
    NetworkError: "Die Antwort war nicht in Ordnung", //1
    	// Sicherheitsfehler 10 - 19
    TokenRequired: "Authentifizierungstoken nicht gefunden", //10
    TokenExpired: "Auth-Token ist abgelaufen", //11
    TokenInvalid: "Auth-Token ist ungültig", //12
    APIKeyNotFound: "API-Schlüssel nicht gefunden", //13
    APIKeyInvalid: "API-Schlüssel ungültig", //14
    CredentialsInvalid: "Angegebene Zugangsdaten ungültig", //15
    UserNotFound: "Benutzer nicht in Datenbank", //16
    AccessDenied: "Zugriff verweigert", //17
    	// Validierungsfehler 20 - 39
    InvalidSelection: "Ausgewählter Menüpunkt existiert nicht", //20
    NoSelection: "Es wurde keine Auswahl getroffen", //21
    SelectionsAboveRange: "Auswahl über dem Bereich", //22
    SelectionsBelowRange: "Auswahlen unterhalb des Bereichs", //23
    CharactersAboveRange: "Zeichen über dem Bereich", //24
    CharactersBelowRange: "Zeichen unterhalb des Bereichs", //25
    NumberAboveRange: "Zahleneingabe liegt über dem Bereich", //26
    NumberBelowRange: "Zahleneingabe liegt unterhalb des Bereichs", //27
    NumberRequired: "Zahleneingabe erforderlich", //28
    NoActiveSession: "Keine aktive Sitzung", //29
    NoInput: "Keine Eingabe erhalten", // 30
    PromptNotFound: "Keine solche Eingabeaufforderung", //31
    KnowledgebaseNotFound: "Wissensdatenbank wurde nicht gefunden", //32
    SessionExpired: "Sitzung ist abgelaufen", //33
    ValidationError: "Validierungsfehler", //39
	// Datenbankfehler 40 - 49
    	// Syntaxfehler
    UnknownToken: 'Unbekanntes Zeichen oder Token: {0}',
    NoCloseParenthesis: 'Open Parenthesis \'{0}\' in Spalte {1} hat keine schließende Klammer',
    NoOpenParenthesis: 'Close Parenthesis \'{0}\' in Spalte {1} hat keine öffnende Klammer',
    DuplicateOperator: 'Doppelter Operator \'{0}\' \'{1}\'',
    NoDefinition: '{0} Definition sollte Texte haben',
    NoAttributeName: 'Attributdefinition sollte Attributnamen haben',
    ExpectedEQ: 'Erwartet \'=\'',
    ExpectNoEOF: 'Ausdruck erwartet, aber Dateiende gefunden',
    ExpectNoNewLine: 'Ausdruck erwartet, aber neue Zeile gefunden',
    ExpectedArrayname: 'Erwarteter Array-Name',
    ExpectedOpenParenthesis: 'Erwartet \'(\'',
    ExpectedNumberOrAttrib: 'Erwartete Zahl oder Attribut',
    ExpectedComma: 'Erwartet \',\'',
    ExpectedCloseParenthesis: 'Erwartet ) aber neue Zeile gefunden',
    NoGoalName: 'Zieldefinition sollte Texte haben',
    NoPromptText: 'Prompt-Definition sollte Texte haben',
    ExpectType: 'Erwartet \'{0}\', aber gefunden \'{1}\'',
    ExpectComparator: 'Komparator erwartet, aber \'{0}\' \'{1}\' gefunden',
    NoInputForAttrib: 'Keine Eingabeaufforderung für Attribut \'{0}\'',
  }
}
