import * as AST from "../ast";
import Tokenizer from "../Tokenizer";
import SymbolTable from "../symbol_table/SymbolTable";
import ParseError from "../errors/ParseError";

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
        }

        while(this.tokenizer.hasNext()){
            declarations.push(this.parseDeclaration());
        }

        return new AST.ProgramFile(imports, declarations);

    }

    parseImportStatement(): AST.ImportStatement {
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

        this.tokenizer.popAndCheck("=");
        let value = this.parseValue();
        this.optionalSemiColon();
        this.currentDeclarationID = undefined;
        this.currentType = undefined;

        let st: SymbolTable;
        if(fromFlow == null) {
            st = this.symbolTable;
        } else {
            st = this.symbolTable.accessFlow(fromFlow);
        }

        if(value instanceof AST.Action){
            st.defineAction(id.name, value);
        } else if(value instanceof AST.Flow){
            st.defineFlow(id.name, value);
        } else {
            st.defineValueConstant(id.name, value);
        }

        return new AST.Declaration(type, id, value);
    }

    parseType(): AST.Type {
        let type = this.tokenizer.pop();
        switch (type){
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
        return this.parseIdentifierHelper(this.tokenizer.pop());
    }

    parseIdentifierHelper(id: string): AST.Identifier{
        if(this.isIdentifier(id)){
            return new AST.Identifier(id);
        }
        throw new ParseError("Invalid identifier: " + id);
    }

    private isIdentifier(id: string): boolean {
        return /[a-z]\w*/.test(id);
    }

    parseValue(): AST.Value {
        let top = this.tokenizer.top();
        if(top != null){
            throw new ParseError("Unexpected end of file.")
        } else if (top!.startsWith('{')){
            return this.parseFlow();
        } else if(this.checkActionType()){
            return this.parseAction();
        } else{
            return this.parsePrimitive();
        }
    }

    checkActionType(): boolean {
        return this.tokenizer.top() === "network" || this.tokenizer.top() === "toggle" || this.tokenizer.top() ===  "counter" || this.tokenizer.top() === "stub";
    }

    parsePrimitive(): AST.Primitive {
        let val = this.tokenizer.pop();
        if(val === null) {
            throw new ParseError("Unexpected end of file.");
        }
        return this.parsePrimitiveHelper(val);
    }

    private parsePrimitiveHelper(val: string): AST.Primitive {
        if(/\d+/.test(val)){
            return new AST.Number(Number(val));
        } else if(/"\w+"/.test(val) || /'\w+'/.test(val)){
            return new AST.String(val.replace('"', ''));
        } else if(/true/.test(val)){
            return new AST.Boolean(true);
        } else if(/false/.test(val)){
            return new AST.Boolean(false);
        } else if(val.startsWith("`")){
            // js type may contain spaces
            if(!val.endsWith("`")){
                let top = this.tokenizer.top();
                while(top != null && !top.endsWith("`")){
                    val += " ";
                    val += this.tokenizer.pop();
                }
            }

            return new AST.JS(val);
        } else if(val.startsWith("[")){
            let input = val.replace("[", "").split(',');
            let array: AST.Primitive[] = [];

            while(!input[0].endsWith("]")) {
                array.push(this.parsePrimitiveHelper(input.pop()!));

                if(input.length == 0){
                    // array type may contain spaces
                    this.tokenizer.pop().split(',');
                }
            }

            array.push(this.parsePrimitiveHelper(input[-1].replace(']', '')));

            return new AST.Array(this.currentType!, array);
        } else {
            throw new ParseError("");
        }
    }
    
    parseAction(): AST.Action {
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
        if(this.tokenizer.top() === "network"){
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
        let val = this.parseValue();
        return new AST.Parameter(name, val);
    }

    parseFlow(): AST.Flow {
        let modifiers: AST.Modifier[] = [];
        let declarations: AST.Declaration[] = [];

        this.tokenizer.popAndCheck("{");

        if (this.tokenizer.top() == null) {
            throw new ParseError("Unexpected end of file.");
        } else if (this.isIdentifier(this.tokenizer.top()!)) {
            modifiers.push(this.parseModifier());
        } else {
            // keep the name of the flow as a state variable in parser to avoid threading it as a parameter excessively
            declarations.push(this.parseDeclaration(this.currentDeclarationID));
        }

        this.tokenizer.popAndCheck("}");
        return new AST.Flow(declarations, modifiers);
    }

    parseModifier(): AST.Modifier {
        let actionIDs: AST.Identifier[] = [];
        let varIDs: AST.Identifier[] = [];

        while(this.tokenizer.top() != ">>"){
            let input = this.tokenizer.pop().split(',');
            input.forEach((token: string) => actionIDs.push(this.parseIdentifierHelper(token)));
        }

        this.tokenizer.popAndCheck(">>");

        while(this.tokenizer.top() != null && !this.isType(this.tokenizer.top()!)){
            let input = this.tokenizer.pop().split(',');
            input.forEach((token: string) => varIDs.push(this.parseIdentifierHelper(token)));
        }

        return new AST.Modifier(actionIDs, varIDs);
    }

    private isType(token: string){
        return token in [ "action", "flow", "js", "any", "number", "string", "boolean", "any[]", "number[]","string[]",
            "boolean[]", "js[]"];
    }

    optionalSemiColon(): void {
        if(this.tokenizer.top() === ";"){
            this.tokenizer.pop();
        }
    }
}
