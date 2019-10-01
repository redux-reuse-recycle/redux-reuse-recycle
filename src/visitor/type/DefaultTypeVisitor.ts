import * as AST from "../../ast";
import TypeVisitor from "./TypeVisitor";

export default abstract class DefaultTypeVisitor implements TypeVisitor {

    visitActionType(actionType: AST.ActionType): any {
        return actionType;
    }

    visitAnyType(anyType: AST.AnyType): any {
        return anyType;
    }

    visitArrayType(arrayType: AST.ArrayType): any {
        return arrayType;
    }

    visitBooleanType(booleanType: AST.BooleanType): any {
        return booleanType;
    }

    visitFlowType(flowType: AST.FlowType): any {
        return flowType;
    }

    visitJSType(jsType: AST.JSType): any {
        return jsType;
    }

    visitNumberType(numberType: AST.NumberType): any {
        return numberType;
    }

    visitStringType(stringType: AST.StringType): any {
        return stringType;
    }

}

