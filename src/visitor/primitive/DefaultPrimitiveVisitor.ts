import * as AST from "../../ast";
import PrimitiveVisitor from "./PrimitiveVisitor";

export default abstract class DefaultPrimitiveVisitor implements PrimitiveVisitor {

    visitAny(any: AST.Any): any {
        return any;
    }

    visitArray(array: AST.Array): any {
        return array;
    }

    visitBoolean(boolean: AST.Boolean): any {
        return boolean;
    }

    visitJS(js: AST.JS): any {
        return js;
    }

    visitNumber(number: AST.Number): any {
        return number;
    }

    visitString(string: AST.String): any {
        return string;
    }

}

