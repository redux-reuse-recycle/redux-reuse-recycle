import * as AST from "../../ast";

export default interface PrimitiveVisitor {

    visitAny(any: AST.Any): any;

    visitArray(array: AST.Array): any;

    visitBoolean(boolean: AST.Boolean): any;

    visitJS(js: AST.JS): any;

    visitNumber(number: AST.Number): any;

    visitString(string: AST.String): any;

}
