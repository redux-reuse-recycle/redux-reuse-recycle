import * as AST from "../ast";
import DefaultASTVisitor from "./DefaultASTVisitor";
import ActionType from "../ast/type/ActionType";
import AnyType from "../ast/type/AnyType";
import BooleanType from "../ast/type/BooleanType";
import FlowType from "../ast/type/FlowType";
import ArrayType from "../ast/type/ArrayType";
import JSType from "../ast/type/JSType";
import NumberType from "../ast/type/NumberType";
import StringType from "../ast/type/StringType";
import Boolean from "../ast/primitive/Boolean";
import String from "../ast/primitive/String";
import JS from "../ast/primitive/JS";
import Array from "../ast/primitive/Array";
import Action from "../ast/Action";
import Flow from "../ast/Flow";
import Identifier from "../ast/Identifier";
import Primitive from "../ast/primitive/Primitive";

export default class TypeCheckVisitor extends DefaultASTVisitor {

    visitAction(action: AST.Action): any {
    //    TODO: check that param name & type match what is expected from the action class. order doesn't matter
        let actualTypes = new Set();
        for (let dec of action.parameters)
        {
            actualTypes.add(dec.acceptASTVisitor(this));
        }

        let expectedTypes = action.clss.acceptASTVisitor();

        if(expectedTypes.size != actualTypes.size){
            throw new Error("Action has incorrect number of parameters. Expected " + expectedTypes.size + " but received " + actualTypes.size);
        }
    }

    visitClass(astClass: AST.Class): any {
        // TODO: encode the parameters expected od each action class as a set of (param name, typeof) strings
    }

    visitDeclaration(declaration: AST.Declaration): any {
        // check that value matches declared type
        switch (declaration.type){
            case ActionType: {
                if(!declaration.value instanceof Action){
                    throw new Error(declaration.id.name + " expects an action as a value.");
                }
                declaration.value.acceptASTVisitor(this);
                break;
            }
            case AnyType: {
                // intentionally accept everything
                break;
            }
            case ArrayType: {
                if(!declaration.value instanceof Array){
                    throw new Error(declaration.id.name + " expects an array value.");
                }
                declaration.value.acceptASTVisitor(this);
                break;
            }
            case BooleanType: {
                if(!declaration.value instanceof Boolean){
                    throw new Error(declaration.id.name + " expects a boolean value.");
                }
                break;
            }
            case FlowType: {
                if(!declaration.value instanceof Flow){
                    throw new Error(declaration.id.name + " expects a flow as a value.");
                }
                declaration.value.acceptASTVisitor(this);
                break;
            }
            case JSType: {
                if(!declaration.value instanceof JS){
                    throw new Error(declaration.id.name + " expects a JavaScript value.");
                }
                break;
            }
            case NumberType: {
                if(!declaration.value instanceof Number){
                    throw new Error(declaration.id.name + " expects a number value.");
                }
                break;
            }
            case StringType: {
                if(!declaration.value instanceof String){
                    throw new Error(declaration.id.name + " expects a string value.");
                }
                break;
            }

        }
    }

    acceptPrimitiveVisitor(primitive: Primitive): any {
        if(primitive instanceof Array) {
            // recurse on declarations
            switch (array.type) {
                case ActionType: {
                    throw new Error("Action arrays are not supported.");
                }
                case AnyType: {
                    // intentionally accept everything
                    break;
                }
                case ArrayType: {
                    throw new Error("Nested arrays are not supported.");
                }
                case BooleanType: {
                    for (let val in array.value) {
                        if (!val instanceof Boolean) {
                            throw new Error("Boolean array expects boolean values.");
                        }
                    }
                    break;
                }
                case FlowType: {
                    throw new Error("Flow arrays are not supported.");
                }
                case JSType: {
                    for (let val in array.value) {
                        if (!val instanceof JS) {
                            throw new Error("JavaScript array expects JavaScript values.");
                        }
                    }
                    break;
                }
                case NumberType: {
                    for (let val in array.value) {
                        if (!val instanceof Number) {
                            throw new Error("Number array expects number values.");
                        }
                    }
                    break;
                }
                case StringType: {
                    for (let val in array.value) {
                        if (!val instanceof String) {
                            throw new Error("String array expects string values.");
                        }
                    }
                    break;
                }
            }
        }
    }

    visitFlow(flow: AST.Flow): any {
        // recurse on declarations and modifiers. Check that declarations do not include flows
        if(flow.declarations.filter((dec) => dec.type instanceof FlowType).length > 0){
            throw new Error("Illegal nested flow.");
        }

        for (let dec in flow.declarations){
            dec.acceptASTVisitor(this)
        }

        for (let mod in flow.modifiers){
            mod.acceptASTVisitor(this)
        }

    //    TODO need to know which flow I'm inside, query flow from symboltable to get its flowsynboltable, query for id there

    }

    visitModifier(modifier: AST.Modifier): any {
        //    TODO: check that the flow on the left matches the type of the variable on the right
        //    query from symbol table
    }

    visitParameter(parameter: AST.Parameter): any {
        //    Check that vales have no actions or flows
        if(parameter.value instanceof Flow || parameter.value instanceof Action){
            throw new Error("Actions do not accept complex types (actions or flows) as parameters.");
        }

        if(parameter.value instanceof Identifier){
        //    TODO: (recursively) dereference and check value is a primitive
        }

        return (parameter.name, typeof parameter.value)

    }

    visitProgramFile(programFile: AST.ProgramFile): any {
        // recurse on declarations
        for (let dec of programFile.declarations)
        {
            dec.acceptASTVisitor(this);
        }
    }

//    Import, identifier, type, primitive nodes have no typechecking

}
