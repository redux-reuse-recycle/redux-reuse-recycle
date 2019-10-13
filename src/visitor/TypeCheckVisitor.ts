import * as AST from "../ast";
import DefaultASTVisitor from "./DefaultASTVisitor";
import SymbolTable from "../symbol_table/SymbolTable";
import TypeCheckError from "../errors/TypeCheckError";
import Logger from "../utils/Logger";
import TypeCheckPrimitiveVisitor from "./primitive/TypeCheckPrimitiveVisitor";

export default class TypeCheckVisitor extends DefaultASTVisitor {
    private table: SymbolTable;
    private currentFlowName?: string;

    constructor() {
        super();
        this.table = new SymbolTable();
        this.currentFlowName = undefined;
    }

    typecheck(ast: AST.ASTNode): void {
        Logger.Log("Begin typechecking.");
        if (ast instanceof AST.ProgramFile) {
            this.visitProgramFile(ast);
        }
        else {
            throw new TypeCheckError("Given AST is not a Program File!");
        }
    }

    visitAction(action: AST.Action): any {
        Logger.Log("Typecheck action");
        let actualTypes: Map<string, AST.Value> = new Map();
        action.params.forEach((p) => actualTypes.set(p.name, p.acceptASTVisitor(this)));

        if(action.clss.expectedParams.size != actualTypes.size){
            throw new TypeCheckError("Action has incorrect number of parameters. Expected " + action.clss.expectedParams.size + " but received " + actualTypes.size);
        }

        action.clss.expectedParams.forEach((_, param) => {
            // expectedParams is a map from string to lambda checking is a value is appropriate
            let fn = action.clss.expectedParams.get(param);
            let actual = actualTypes.get(param);
            if(fn == null || actual == null || !fn(actual!))
            {
                throw new TypeCheckError(param + " expected a value of type " + action.clss.expectedParams.get(param) + ", got " + actualTypes.get(param));
            }
        });
    }

    visitDeclaration(declaration: AST.Declaration): any {
        Logger.Log("Typecheck " + declaration.id.name);
        let st: SymbolTable;
        if(this.currentFlowName == undefined) {
            st = this.table;
        } else {
            st = this.table.accessFlow(this.currentFlowName);
        }

        Logger.Log("Declare " + declaration.id.name + " in " + this.currentFlowName);

        if(declaration.value instanceof AST.Action){
            st.defineAction(declaration.id.name, declaration.value);
        } else if(declaration.type instanceof AST.FlowType){
            st.defineFlow(declaration.id.name);
        } else {
            st.defineValueConstant(declaration.id.name, declaration.value);
        }


        // dereference identifiers
        let value = declaration.value;
        if (declaration.value instanceof AST.Identifier){
            if(this.currentFlowName != undefined){
                if(declaration.type instanceof AST.ActionType)
                {
                    value = this.table.accessActionDefinitionFromFlow(declaration.value.name, this.currentFlowName!);
                } else {
                    value = this.table.accessDefinitionFromFlow(declaration.value.name, this.currentFlowName!);
                }
            } else {
                if(declaration.type instanceof AST.ActionType){
                    value = this.table.accessAction(declaration.value.name);
                } else {
                    value = this.table.accessValueConstant(declaration.value.name);
                }
            }
        }

        // check that value matches declared type
        if(declaration.type instanceof AST.ActionType) {
            if(! (value instanceof AST.Action)){
                throw new TypeCheckError(declaration.id.name + " expects an action as a value.");
            }
            value.acceptASTVisitor(this);
        } else if(declaration.type instanceof AST.AnyType) {
            // intentionally accept everything
            // but if it's an action, flow or array, it should still be internally typechecked
            value.acceptASTVisitor(this);
        } else if(declaration.type instanceof AST.ArrayType) {
            Logger.Log("Declare array");
            if(! (value instanceof AST.Array)){
                throw new TypeCheckError(declaration.id.name + " expects an array value.");
            }
            // check that all items inside are of the same type
            (value as AST.Array).acceptPrimitiveVisitor(new TypeCheckPrimitiveVisitor());

            // check that type of contents matches declared type
            if (!(declaration.type.innerType instanceof AST.AnyType) && !(value.type instanceof AST.AnyType)
                && declaration.type.innerType.constructor !== value.type.constructor){
                throw new TypeCheckError(declaration.id.name + " array contents do not match expected type. ")
            }

        } else if(declaration.type instanceof AST.BooleanType) {
            if(! (value instanceof AST.Boolean)){
                throw new TypeCheckError(declaration.id.name + " expects a boolean value.");
            }
        } else if(declaration.type instanceof AST.FlowType) {
            if(! (value instanceof AST.Flow)){
                throw new TypeCheckError(declaration.id.name + " expects a flow as a value.");
            }
            // This probably won't survive nested flows but should be ok for now
            let oldVal = this.currentFlowName;
            this.currentFlowName = declaration.id.name;
            value.acceptASTVisitor(this);
            this.currentFlowName = oldVal;
        } else if(declaration.type instanceof AST.JSType) {
            if(! (value instanceof AST.JS)){
                throw new TypeCheckError(declaration.id.name + " expects a JavaScript value.");
            }
        } else if(declaration.type instanceof AST.NumberType) {
            if(! (value instanceof AST.Number)){
                throw new TypeCheckError(declaration.id.name + " expects a number value.");
            }
        } else if(declaration.type instanceof AST.StringType) {
            if(!(value instanceof AST.String)){
                throw new TypeCheckError(declaration.id.name + " expects a string value.");
            }
        } else {
            throw new Error("Unexpected Type" + typeof declaration.type);
        }
    }



    visitFlow(flow: AST.Flow): any {
        Logger.Log("Typecheck Flow");
        // recurse on declarations and modifiers. Check that declarations do not include flows
        if(flow.declarations.filter((dec) => dec.type instanceof AST.FlowType).length > 0){
            throw new TypeCheckError("Illegal nested flow.");
        }

        flow.declarations.forEach((dec) => dec.acceptASTVisitor(this));

        flow.modifiers.forEach((mod) => mod.acceptASTVisitor(this));
    }

    visitModifier(modifier: AST.Modifier): any {
        Logger.Log("Typecheck Modifier in " + this.currentFlowName);
        // check that the action on the left can output to the type of the variable on the right
        modifier.actions.forEach((actionID) => {
            Logger.Log(actionID.name);
            modifier.values.forEach((valID) => {
                Logger.Log(valID.name);
                // modifiers can only exist in flows
                let clss = this.table.accessActionDefinitionFromFlow(actionID.name, this.currentFlowName!).clss;
                let val = this.table.accessDefinitionFromFlow(valID.name, this.currentFlowName!);

                // Class has list of lambdas that return true if val can be modifier by that action
                if (!clss.canModify.map((fn: ((paramVal: AST.Value) => boolean) ) => { return fn(val) })
                        .reduce((acc, b) => {return acc || b}, false)) {
                    throw new TypeCheckError((typeof (clss)).replace("Class", "") + " actions cannot write to " + typeof val + "variables.");
                }
        })});
    }

    visitParameter(parameter: AST.Parameter): any {
        Logger.Log("Typecheck: Parameter");
        //    Check that values have no actions or flows
        if(parameter.value instanceof AST.Flow || parameter.value instanceof AST.Action){
            throw new TypeCheckError("Actions do not accept complex types (actions or flows) as parameters.");
        }

        let paramVal;
        if(parameter.value instanceof AST.Identifier){
            // (recursively) dereference and check value is a primitive
            // where to look depends on whether we are inside a flow
            if(this.currentFlowName == undefined){
                paramVal = this.table.accessValueConstant(parameter.value.name);
            } else {
                paramVal = this.table.accessDefinitionFromFlow(parameter.value.name, this.currentFlowName);
            }
        } else {
            paramVal = parameter.value;
        }

        // Enforce uppercase for legibility
        if(parameter.name === "method" && paramVal instanceof AST.String && ['"GET"', '"PUT"', '"POST"', '"DELETE"', '"PATCH"'].indexOf(paramVal.toString()) === -1){
            Logger.Log(paramVal.toString());
            throw new TypeCheckError(parameter.name + " has invalid method type.");
        }
        return paramVal;

    }

    visitProgramFile(programFile: AST.ProgramFile): any {
        // recurse on files parsed via import
        programFile.importStatements.forEach((imp) => imp.acceptASTVisitor(this));
        // recurse on declarations
        programFile.declarations.forEach((dec) => dec.acceptASTVisitor(this));
    }

    visitImportStatement(importStatement: AST.ImportStatement): any {
        importStatement.file.acceptASTVisitor(this);
    }

//   identifier, type, class, primitive nodes have no typechecking
}
