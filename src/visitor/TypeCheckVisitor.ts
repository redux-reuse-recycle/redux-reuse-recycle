import * as AST from "../ast";
import DefaultASTVisitor from "./DefaultASTVisitor";
import SymbolTable from "../symbol_table/SymbolTable";
import TypeCheckError from "../errors/TypeCheckError";

export default class TypeCheckVisitor extends DefaultASTVisitor {
    private table: SymbolTable;
    private currentFlowName?: string;

    constructor(table: SymbolTable) {
        super();
        this.table = table;
        this.currentFlowName = undefined;
    }

    typecheck(ast: AST.ASTNode): void {
        if (ast instanceof AST.ProgramFile) {
            this.visitProgramFile(ast);
        }
        else {
            throw new TypeCheckError("Given AST is not a Program File!");
        }
    }

    visitAction(action: AST.Action): any {
        let actualTypes: Map<string, string> = new Map();
        action.params.forEach((p) => actualTypes.set(p.name, p.acceptASTVisitor(this)));

        if(action.clss.expectedParams.size != actualTypes.size){
            throw new TypeCheckError("Action has incorrect number of parameters. Expected " + action.clss.expectedParams.size + " but received " + actualTypes.size);
        }

        for (let param of action.clss.expectedParams.keys()){
            if(actualTypes.get(param) !== action.clss.expectedParams.get(param))
            {
                throw new TypeCheckError(param + " expected a value of type " + action.clss.expectedParams.get(param) + ", got " + actualTypes.get(param));
            }
        }
    }

    visitDeclaration(declaration: AST.Declaration): any {
        // check that value matches declared type
        switch (typeof declaration.type){
            case typeof AST.ActionType: {
                if(! (declaration.value instanceof AST.Action)){
                    throw new TypeCheckError(declaration.id.name + " expects an action as a value.");
                }
                declaration.value.acceptASTVisitor(this);
                break;
            }
            case typeof AST.AnyType: {
                // intentionally accept everything
                // but if it's an action, flow or array, it should still be internally typechecked
                declaration.value.acceptASTVisitor(this);
                break;
            }
            case typeof AST.ArrayType: {
                if(! (declaration.value instanceof AST.Array)){
                    throw new TypeCheckError(declaration.id.name + " expects an array value.");
                }
                declaration.value.acceptASTVisitor(this);
                break;
            }
            case typeof AST.BooleanType: {
                if(! (declaration.value instanceof AST.Boolean)){
                    throw new TypeCheckError(declaration.id.name + " expects a boolean value.");
                }
                break;
            }
            case typeof AST.FlowType: {
                if(! (declaration.value instanceof AST.Flow)){
                    throw new TypeCheckError(declaration.id.name + " expects a flow as a value.");
                }
                // This probably won't survive nested flows but should be ok for now
                let oldVal = this.currentFlowName;
                this.currentFlowName = declaration.id.name;
                declaration.value.acceptASTVisitor(this);
                this.currentFlowName = oldVal;
                break;
            }
            case typeof AST.JSType: {
                if(! (declaration.value instanceof AST.JS)){
                    throw new TypeCheckError(declaration.id.name + " expects a JavaScript value.");
                }
                break;
            }
            case typeof AST.NumberType: {
                if(! (declaration.value instanceof AST.Number)){
                    throw new TypeCheckError(declaration.id.name + " expects a number value.");
                }
                break;
            }
            case typeof AST.StringType: {
                if(! (declaration.value instanceof AST.String)){
                    throw new TypeCheckError(declaration.id.name + " expects a string value.");
                }
                break;
            }

        }
    }

    acceptPrimitiveVisitor(primitive: AST.Primitive): any {
        if(primitive instanceof AST.Array) {
            // recurse on declarations
            switch (typeof primitive.type) {
                case typeof AST.ActionType: {
                    throw new TypeCheckError("Action arrays are not supported.");
                }
                case typeof AST.AnyType: {
                    // intentionally accept everything that's not action, array or flow
                    primitive.value.forEach((val: AST.Primitive) =>
                    {
                        if (val instanceof AST.Action){
                            throw new TypeCheckError("Arrays containing actions are not supported.");
                        }

                        if (val instanceof AST.Flow){
                            throw new TypeCheckError("Arrays containing flows are not supported.");
                        }

                        if (val instanceof AST.Array){
                            throw new TypeCheckError("Nested arrays are not supported.");
                        }
                    });
                    break;
                }
                case typeof AST.ArrayType: {
                    throw new TypeCheckError("Nested arrays are not supported.");
                }
                case typeof AST.BooleanType: {
                    primitive.value.forEach((val: AST.Primitive) => {if (!(val instanceof AST.Boolean)) throw new TypeCheckError("Boolean array expects boolean values.");});
                    break;
                }
                case typeof AST.FlowType: {
                    throw new TypeCheckError("Flow arrays are not supported.");
                }
                case typeof AST.JSType: {
                    primitive.value.forEach((val: AST.Primitive) => {if (!(val instanceof AST.JS)) throw new TypeCheckError("JavaScript array expects JavaScript values.")});
                    break;
                }
                case typeof AST.NumberType: {
                    primitive.value.forEach((val: AST.Primitive) => {if (! (val instanceof AST.Number)) throw new TypeCheckError("Number array expects number values.")});
                    break;
                }
                case typeof AST.StringType: {
                    primitive.value.forEach((val: AST.Primitive) => {if (! (val instanceof AST.String)) throw new TypeCheckError("String array expects string values.")});
                    break;
                }
            }
        }
    }

    visitFlow(flow: AST.Flow): any {
        // recurse on declarations and modifiers. Check that declarations do not include flows
        if(flow.declarations.filter((dec) => dec.type instanceof AST.FlowType).length > 0){
            throw new TypeCheckError("Illegal nested flow.");
        }

        flow.declarations.forEach((dec) => dec.acceptASTVisitor(this));

        flow.modifiers.forEach((mod) => mod.acceptASTVisitor(this));
    }

    visitModifier(modifier: AST.Modifier): any {
        // check that the action on the left can output to the type of the variable on the right
        modifier.actions.forEach((action) => {
            modifier.values.forEach((val) => {
                // modifiers can only exist in flows
                if (! (typeof val in action.clss.canModify)){
                    throw new TypeCheckError((typeof (action.clss)).replace("Class", "") + " actions cannot write to " + typeof val + "variables.");
                }
        })});
    }

    visitParameter(parameter: AST.Parameter): any {
        //    Check that vales have no actions or flows
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
        if(parameter.name === "method" && !(paramVal.toString() in ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'])){
            throw new TypeCheckError(parameter.name + " has invalid method type.");
        }
        return typeof paramVal;

    }

    visitProgramFile(programFile: AST.ProgramFile): any {
        // recurse on declarations
        programFile.declarations.forEach((dec) => dec.acceptASTVisitor(this));
    }

//    Import, identifier, type, class, primitive nodes have no typechecking
}
