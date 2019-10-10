import * as AST from "../ast";
import Tokenizer from "../Tokenizer";
import SymbolTable from "../symbol_table/SymbolTable";
import ParseError from "../errors/ParseError";
import Logger from "../utils/Logger";

export default class ParserVisitor {
    private tokenizer: Tokenizer;
    private symbolTable: SymbolTable;
    private currentDeclarationID?: string;
    private currentType?: AST.Type;

    constructor(tkn: Tokenizer) {
        this.tokenizer = tkn;
        this.symbolTable = new SymbolTable();
    }

    parse(): AST.ASTNode {
        return this.parseProgramFile();
    }

    getSymbolTable(): SymbolTable{
        return this.symbolTable;
    }
    
    parseProgramFile(): AST.ProgramFile
    {
        let imports: AST.ImportStatement[] = [];
        let declarations: AST.Declaration[] = [];

        while(this.tokenizer.top() === "import"){
            imports.push(this.parseImportStatement());
            // Logger.Log("Next token: " + this.tokenizer.top());
            // Logger.Log(Boolean(this.tokenizer.top() === "import").toString());
        }
        Logger.Log("Done imports");
        // Logger.Log("Next token: " + this.tokenizer.top());
        // Logger.Log(Boolean(this.tokenizer.top() === "import").toString());

        while(this.tokenizer.hasNext()){
            declarations.push(this.parseDeclaration());
        }

        return new AST.ProgramFile(imports, declarations);

    }

    parseImportStatement(): AST.ImportStatement {
        Logger.Log("Parsing import");
        this.tokenizer.popAndCheck("import");
        let filePath = this.tokenizer.pop();
        this.tokenizer.popAndCheck("as");
        let id = this.parseIdentifier();
        this.optionalSemiColon();
        return new AST.ImportStatement(filePath, id);
    }

    parseDeclaration(fromFlow?: string): AST.Declaration {
        let type = this.parseType();
        let id = this.parseIdentifier();
        this.currentDeclarationID = id.name;
        this.currentType = type;

        let value: AST.Value;
        if(this.tokenizer.top() == "=")
        {
            this.tokenizer.popAndCheck("=");
            value = this.parseValue();
        } else {
            value = this.defaultValue(type);
        }

        this.optionalSemiColon();
        this.currentDeclarationID = undefined;
        this.currentType = undefined;

        let st: SymbolTable;
        if(fromFlow == null) {
            st = this.symbolTable;
        } else {
            st = this.symbolTable.accessFlow(fromFlow);
        }

        // Flows are defined in the flow parsing so that their declarations have a symboltable to go into.
        if(value instanceof AST.Action){
            st.defineAction(id.name, value);
        } else if (value instanceof AST.Primitive || value instanceof AST.Identifier){
            st.defineValueConstant(id.name, value);
        }

        return new AST.Declaration(type, id, value);
    }

    private defaultValue(type: AST.Type): AST.Value{
        if (type instanceof AST.AnyType){
            return new AST.Any();
        } else if (type instanceof AST.ArrayType){
            return new AST.Array(type.innerType);
        } else if (type instanceof AST.BooleanType){
            return new AST.Boolean();
        } else if (type instanceof AST.JSType){
            return new AST.JSType();
        } else if (type instanceof AST.NumberType){
            return new AST.Number();
        } else if (type instanceof AST.StringType){
            return new AST.String();
        } else {
            throw new ParseError(this.currentDeclarationID + " must be initialized.");
        }
    }

    parseType(): AST.Type {
        let type = this.tokenizer.pop();
        Logger.Log("Parse type: "+type);
        switch (type){
            case "action": {
                return new AST.ActionType();
            }
            case "flow": {
                return new AST.FlowType();
            }
            case "js": {
                return new AST.JSType();
            }
            case "any": {
                return new AST.AnyType();
            }
            case "number": {
                return new AST.NumberType();
            }
            case "string": {
                return new AST.StringType();
            }
            case "boolean": {
                return new AST.BooleanType();
            }
            case "any[]": {
                return new AST.ArrayType(new AST.AnyType);
            }
            case "number[]": {
                return new AST.ArrayType(new AST.NumberType);
            }
            case "string[]": {
                return new AST.ArrayType(new AST.StringType);
            }
            case "boolean[]": {
                return new AST.ArrayType(new AST.BooleanType);
            }
            case "js[]": {
                return new AST.ArrayType(new AST.JSType);
            }
            default: {
                throw new ParseError("Unexpected token " + type);
            }
        }
    }

    parseIdentifier(): AST.Identifier {
        Logger.Log("Parse identifier: "+this.tokenizer.top());
        return this.parseIdentifierHelper(this.tokenizer.pop());
    }

    parseIdentifierHelper(id: string): AST.Identifier{
        if(this.isIdentifier(id)){
            return new AST.Identifier(id);
        }
        throw new ParseError("Invalid identifier: " + id);
    }

    private isIdentifier(id: string): boolean {
        return /^[a-zA-Z][\w|\.]*/.test(id) && !this.isReserved(id);
    }

    private isReserved(id: string): boolean{
        return ['import', 'as', 'js', 'any', 'number', 'string', 'boolean', 'any[]', 'number[]', 'string[]', 'boolean[]',
        'js[]', 'action', 'flow', 'network', 'toggle', 'counter', 'stub', '=', '>>'].indexOf(id) > -1;
    }

    parseValue(): AST.Value {
        let top = this.tokenizer.top();
        if(top == null){
            throw new ParseError("Unexpected end of file.")
        } else if (top.startsWith('{')){
            return this.parseFlow();
        } else if(this.checkActionType()){
            return this.parseAction();
        } else if (this.isIdentifier(top)) {
            return this.parseIdentifier();
        } else {
            return this.parsePrimitive();
        }
    }

    checkActionType(): boolean {
        let top = this.tokenizer.top();
        return top !== null && (top.search("network") > -1  || top.search("toggle") > -1 ||
            top.search("counter") > -1 || top.search("stub") > -1);
    }

    parsePrimitive(): AST.Primitive {
        Logger.Log("Parse primitive: "+this.tokenizer.top());
        let val = this.tokenizer.pop();
        if(val === null) {
            throw new ParseError("Unexpected end of file.");
        }
        let primitive = this.parsePrimitiveHelper(val);
        this.optionalSemiColon();
        return primitive;
    }

    private parsePrimitiveHelper(val: string): AST.Primitive {
        if(val.startsWith("`")){
            // js type may contain spaces
            while(!val.endsWith("`")){
                val = val.concat(" ", this.tokenizer.pop());
            }

            this.optionalSemiColon();
            return new AST.JS(val);
        } else if(val.startsWith("[")) {
            Logger.Log("Parse array");
            let input = val.replace('[', '').replace(']', ',]').split(',');
            let array: AST.Primitive[] = [];

            while (input[0] != "]") {
                Logger.Log(input.join(' '));
                array.push(this.parsePrimitiveHelper(input.shift()!));

                if (input.length == 0) {
                    // array type may contain spaces
                    input = this.tokenizer.pop().replace(']', ',]').split(',');
                }
            }

            this.optionalSemiColon();
            return new AST.Array(this.currentType!, array);
        } else if(!isNaN(Number(val))){
            return new AST.Number(Number(val));
        } else if(val.startsWith("'")){ // single quote string
            let sArr = [val];
            while(!sArr[sArr.length-1].endsWith("'")){
                sArr.push(this.tokenizer.pop())
            }
            return new AST.String(sArr.join(" ").replace("'", ''));
        } else if(val.startsWith('"')){ // double quote string
            let sArr = [val];
            while(!sArr[sArr.length-1].endsWith('"')){
                sArr.push(this.tokenizer.pop())
            }
            return new AST.String(sArr.join(" ").replace('"', ''));
        } else if(/true/.test(val)){
            return new AST.Boolean(true);
        } else if(/false/.test(val)){
            return new AST.Boolean(false);
        } else {
            throw new ParseError(val);
        }
    }
    
    parseAction(): AST.Action {
        Logger.Log("Parse action: "+this.tokenizer.top());
        let clss = this.parseActionClass();
        this.tokenizer.popAndCheck("(");
        let params: AST.Parameter[] = [];
        while(this.tokenizer.top() !== ")"){
            params.push(this.parseParameter());
            this.tokenizer.replaceInToken(',', '');
        }
        this.tokenizer.popAndCheck(")");
        this.optionalSemiColon();
        return new AST.Action(clss, params);
    }

    parseActionClass(): AST.Class {
        if(this.tokenizer.top() ==="network"){
            this.tokenizer.pop();
            return new AST.NetworkClass();
        } else if(this.tokenizer.top() === "toggle"){
            this.tokenizer.pop();
            return new AST.ToggleClass();
        } if(this.tokenizer.top() === "counter"){
            this.tokenizer.pop();
            return new AST.CounterClass();
        } if(this.tokenizer.top() === "stub"){
            this.tokenizer.pop();
            return new AST.StubClass();
        } else {
            throw new ParseError("Unexpected Action class: " + this.tokenizer.pop());
        }
    }

    parseParameter(): AST.Parameter {
        let name = this.tokenizer.pop();
        this.tokenizer.popAndCheck("=");
        this.tokenizer.replaceInToken(',', '');
        let val = this.parseValue();
        return new AST.Parameter(name, val);
    }

    parseFlow(): AST.Flow {
        Logger.Log("Parse flow: ");
        let modifiers: AST.Modifier[] = [];
        let declarations: AST.Declaration[] = [];

        this.tokenizer.popAndCheck("{");
        this.symbolTable.defineFlow(this.currentDeclarationID!);

        while(this.tokenizer.top() != '}')
        {
            if (this.tokenizer.top() == null) {
                throw new ParseError("Unexpected end of file.");
            } else if (this.tokenizer.lineContains("=") || this.isType(this.tokenizer.top()!)) {
                // keep the name of the flow as a state variable in parser to avoid threading it as a parameter excessively
                declarations.push(this.parseDeclaration(this.currentDeclarationID));
            } else {
                modifiers.push(this.parseModifier());
            }
        }

        this.tokenizer.popAndCheck("}");
        return new AST.Flow(declarations, modifiers);
    }

    parseModifier(): AST.Modifier {
        Logger.Log("Parse modifier");
        let actionIDs: AST.Identifier[] = [];
        let varIDs: AST.Identifier[] = [];

        if(this.tokenizer.top() == ">>"){
            throw new ParseError("Modifies clauses must have an action on the left.");
        }

        while(this.tokenizer.top() != ">>" && this.tokenizer.top() != ";"){
            this.parseCommaSepIDs(actionIDs);
        }

        // optional second half: modifies clause does not need to modify a variable
        if(this.tokenizer.top() == ">>"){
            this.tokenizer.popAndCheck(">>");

            this.parseCommaSepIDs(varIDs);
        }

        this.optionalSemiColon();

        return new AST.Modifier(actionIDs, varIDs);
    }

    private parseCommaSepIDs(toList: AST.Identifier[]) {
        let val = this.tokenizer.pop();
        let seq = val.split(',');

        while (val.endsWith(',')) {
            if (seq[0].length > 0) {
                toList.push(this.parseIdentifierHelper(seq.shift()!));
            } else {
                // discard empty sub-tokens
                seq.shift();
            }

            if (seq.length == 0) {
                val = this.tokenizer.pop();
                seq = val.split(',');
            }
        }
    }

    private isType(token: string){
        return ["action", "flow", "js", "any", "number", "string", "boolean", "any[]", "number[]", "string[]",
            "boolean[]", "js[]"].indexOf(token) > -1;
    }

    optionalSemiColon(): void {
        if(this.tokenizer.top() === ";"){
            this.tokenizer.pop();
        }
    }
}
