import DefaultPrimitiveVisitor from "./DefaultPrimitiveVisitor";
import TypeCheckError from "../../errors/TypeCheckError";
import Logger from "../../utils/Logger";
import * as AST from "../../ast";

export default class TypeCheckPrimitiveVisitor extends DefaultPrimitiveVisitor {

    visitArray(array: AST.Array): any {
        Logger.Log("Typecheck array");
        // recurse on declarations
        if (array.type instanceof AST.ActionType) {
            throw new TypeCheckError("Action arrays are not supported.");
        } else if (array.type instanceof AST.AnyType) {
            // intentionally accept everything that's not action, array or flow
            array.value.forEach((val: AST.Primitive) =>
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
        } else if (array.type instanceof AST.ArrayType) {
            throw new TypeCheckError("Nested arrays are not supported.");
        }  else if (array.type instanceof AST.BooleanType) {
            array.value.forEach((val: AST.Primitive) => {if (!(val instanceof AST.Boolean)) throw new TypeCheckError("Boolean array expects boolean values.");});
            array.value.forEach((val: AST.Primitive) => {Logger.Log(String(val instanceof AST.Boolean))});
        } else if (array.type instanceof AST.FlowType) {
            throw new TypeCheckError("Flow arrays are not supported.");
        } else if (array.type instanceof AST.JSType) {
            array.value.forEach((val: AST.Primitive) => {if (!(val instanceof AST.JS)) throw new TypeCheckError("JavaScript array expects JavaScript values.")});
        } else if (array.type instanceof AST.NumberType) {
            array.value.forEach((val: AST.Primitive) => {if (! (val instanceof AST.Number)) throw new TypeCheckError("Number array expects number values.")});
        } else if (array.type instanceof AST.StringType) {
            array.value.forEach((val: AST.Primitive) => {if (! (val instanceof AST.String)) throw new TypeCheckError("String array expects string values.")});
        }
    }

}
