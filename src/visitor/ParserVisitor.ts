import * as AST from "../ast";
import Tokenizer from "../Tokenizer";

export default class ParserVisitor {
    
    parseProgramFile(tokenizer: Tokenizer): AST.ProgramFile
    {
        
    }

    parseImportStatement(tokenizer: Tokenizer): AST.ImportStatement {
        
    }

    parseDeclaration(tokenizer: Tokenizer): AST.Declaration {
        
    }

    parseType(tokenizer: Tokenizer): AST.Type {

    }

    parseIdentifier(tokenizer: Tokenizer): AST.Identifier {
        
    }

    parsePrimitive(tokenizer: Tokenizer): AST.Primitive {

    }
    
    parseAction(tokenizer: Tokenizer): AST.Action {
        
    }

    parseFlow(tokenizer: Tokenizer): AST.Flow {
        
    }

    parseClass(tokenizer: Tokenizer): AST.Class {

    }

    parseParameter(tokenizer: Tokenizer): AST.Parameter {
        
    }

    parseModifier(tokenizer: Tokenizer): AST.Modifier {
        
    }
    
    // === Types ===

    parseActionType(tokenizer: Tokenizer): AST.ActionType {

    }

    parseAnyType(tokenizer: Tokenizer): AST.AnyType {

    }

    parseArrayType(tokenizer: Tokenizer): AST.ArrayType {

    }

    parseBooleanType(tokenizer: Tokenizer): AST.BooleanType {

    }

    parseFlowType(tokenizer: Tokenizer): AST.FlowType {

    }

    parseJSType(tokenizer: Tokenizer): AST.JSType {

    }

    parseNumberType(tokenizer: Tokenizer): AST.NumberType {

    }

    parseStringType(tokenizer: Tokenizer): AST.StringType {

    }
    
    // === Classes ===

    parseCounterClass(tokenizer: Tokenizer): AST.CounterClass {

    }

    parseNetworkClass(tokenizer: Tokenizer): AST.NetworkClass {

    }

    parseStubClass(tokenizer: Tokenizer): AST.StubClass {

    }

    parseToggleClass(tokenizer: Tokenizer): AST.ToggleClass {

    }
    
    // === Primitives ===

    parseAny(tokenizer: Tokenizer): AST.Any {
        
    }

    parseArray(tokenizer: Tokenizer): AST.Array {

    }

    parseBoolean(tokenizer: Tokenizer): AST.Boolean {

    }

    parseJS(tokenizer: Tokenizer): AST.JS {

    }

    parseNumber(tokenizer: Tokenizer): AST.Number {

    }

    parseString(tokenizer: Tokenizer): AST.String {

    }
    

}

