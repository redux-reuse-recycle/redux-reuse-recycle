import * as AST from "../ast";
import Tokenizer from "../Tokenizer";
import SymbolTable from "../symbol_table/SymbolTable";

export default class ParserVisitor {
    private readonly tokenizer: Tokenizer;

    constructor(tokenizer: Tokenizer) {
        this.tokenizer = tokenizer;
    }

    parse() : AST.ASTNode {
        throw new Error("Not Yet Implemented!");
    }

    getSymbolTable(): SymbolTable {
        throw new Error("Not Yet Implemented!");
    }

    parseProgramFile(tokenizer: Tokenizer): AST.ProgramFile
    {
        throw new Error("Not Yet Implemented!");
    }

    parseImportStatement(tokenizer: Tokenizer): AST.ImportStatement {
        throw new Error("Not Yet Implemented!");
    }

    parseDeclaration(tokenizer: Tokenizer): AST.Declaration {
        throw new Error("Not Yet Implemented!");
    }

    parseType(tokenizer: Tokenizer): AST.Type {
        throw new Error("Not Yet Implemented!");
    }

    parseIdentifier(tokenizer: Tokenizer): AST.Identifier {
        throw new Error("Not Yet Implemented!");
    }

    parserValue(tokenizer: Tokenizer): AST.Value {
        throw new Error("Not Yet Implemented!");
    }

    parsePrimitive(tokenizer: Tokenizer): AST.Primitive {
        throw new Error("Not Yet Implemented!");
    }

    parseAction(tokenizer: Tokenizer): AST.Action {
        throw new Error("Not Yet Implemented!");
    }

    parseFlow(tokenizer: Tokenizer): AST.Flow {
        throw new Error("Not Yet Implemented!");
    }

    parseClass(tokenizer: Tokenizer): AST.Class {
        throw new Error("Not Yet Implemented!");
    }

    parseParameter(tokenizer: Tokenizer): AST.Parameter {
        throw new Error("Not Yet Implemented!");
    }

    parseModifier(tokenizer: Tokenizer): AST.Modifier {
        throw new Error("Not Yet Implemented!");
    }

    // === Types ===

    parseActionType(tokenizer: Tokenizer): AST.ActionType {
        throw new Error("Not Yet Implemented!");
    }

    parseAnyType(tokenizer: Tokenizer): AST.AnyType {
        throw new Error("Not Yet Implemented!");
    }

    parseArrayType(tokenizer: Tokenizer): AST.ArrayType {
        throw new Error("Not Yet Implemented!");
    }

    parseBooleanType(tokenizer: Tokenizer): AST.BooleanType {
        throw new Error("Not Yet Implemented!");
    }

    parseFlowType(tokenizer: Tokenizer): AST.FlowType {
        throw new Error("Not Yet Implemented!");
    }

    parseJSType(tokenizer: Tokenizer): AST.JSType {
        throw new Error("Not Yet Implemented!");
    }

    parseNumberType(tokenizer: Tokenizer): AST.NumberType {
        throw new Error("Not Yet Implemented!");
    }

    parseStringType(tokenizer: Tokenizer): AST.StringType {
        throw new Error("Not Yet Implemented!");
    }

    // === Classes ===

    parseCounterClass(tokenizer: Tokenizer): AST.CounterClass {
        throw new Error("Not Yet Implemented!");
    }

    parseNetworkClass(tokenizer: Tokenizer): AST.NetworkClass {
        throw new Error("Not Yet Implemented!");
    }

    parseStubClass(tokenizer: Tokenizer): AST.StubClass {
        throw new Error("Not Yet Implemented!");
    }

    parseToggleClass(tokenizer: Tokenizer): AST.ToggleClass {
        throw new Error("Not Yet Implemented!");
    }

    // === Primitives ===

    parseAny(tokenizer: Tokenizer): AST.Any {
        throw new Error("Not Yet Implemented!");
    }

    parseArray(tokenizer: Tokenizer): AST.Array {
        throw new Error("Not Yet Implemented!");
    }

    parseBoolean(tokenizer: Tokenizer): AST.Boolean {
        throw new Error("Not Yet Implemented!");
    }

    parseJS(tokenizer: Tokenizer): AST.JS {
        throw new Error("Not Yet Implemented!");
    }

    parseNumber(tokenizer: Tokenizer): AST.Number {
        throw new Error("Not Yet Implemented!");
    }

    parseString(tokenizer: Tokenizer): AST.String {
        throw new Error("Not Yet Implemented!");
    }
}
