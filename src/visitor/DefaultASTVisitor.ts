import * as AST from "../ast";
import ASTVisitor from "./ASTVisitor";

export default abstract class DefaultASTVisitor implements ASTVisitor {

    visitAction(action: AST.Action): any {
        return action;
    }

    visitClass(astClass: AST.Class): any {
        return astClass;
    }

    visitDeclaration(declaration: AST.Declaration): any {
        return declaration;
    }

    visitFlow(flow: AST.Flow): any {
        return flow;
    }

    visitIdentifier(identifier: AST.Identifier): any {
        return identifier;
    }

    visitImportStatement(importStatement: AST.ImportStatement): any {
        return importStatement;
    }

    visitModifier(modifier: AST.Modifier): any {
        return modifier;
    }

    visitParameter(parameter: AST.Parameter): any {
        return parameter;
    }

    visitPrimitive(primitive: AST.Primitive): any {
        return primitive;
    }

    visitProgramFile(programFile: AST.ProgramFile): any {
        return programFile;
    }

    visitType(type: AST.Type): any {
        return type;
    }

}
