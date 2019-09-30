import * as AST from "../../ast";

export default interface TypeVisitor {

    visitActionType(actionType: AST.ActionType): any;

    visitAnyType(anyType: AST.AnyType): any;

    visitArrayType(arrayType: AST.ArrayType): any;

    visitBooleanType(booleanType: AST.BooleanType): any;

    visitFlowType(flowType: AST.FlowType): any;

    visitJSType(jsType: AST.JSType): any;

    visitNumberType(numberType: AST.NumberType): any;

    visitStringType(stringType: AST.StringType): any;

}
