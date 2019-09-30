export default class Token {
    // Import
    public static IMPORT = "import";
    public static AS = "as";

    public static ACTION = "action";
    public static LEFT_PAREN = "(";
    public static RIGHT_PAREN = ")";
    public static NETWORK = "network";
    public static TOGGLE = "toggle";
    public static COUNTER = "counter";
    public static APPEND = "append";
    public static STUB = "stub";

    public static FLOW = "flow";
    public static LEFT_BRACE = "{";
    public static RIGHT_BRACE = "}";
    public static MODIFIES = ">>";

    // Type
    public static JS = "js";
    public static ANY = "any";
    public static NUMBER = "number";
    public static ARRAY = "array";
    public static STRING = "string";
    public static BOOLEAN = "boolean";

    // General
    public static IDENTIFIER = "[_A-Za-z]+([A-Za-z0-9]*)";
    public static DELIMITER = ";";
    public static EQUALS = "=";
    public static COMMA = ",";
    public static COMMENT = "//";
}
