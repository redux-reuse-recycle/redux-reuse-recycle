import * as AST from "../ast";

export default interface ASTVisitor {

    visitProgramFile(programFile: AST.ProgramFile): any;

    visitImportStatement(importStatement: AST.ImportStatement): any;

    visitDeclaration(declaration: AST.Declaration): any;

    visitType(type: AST.Type): any;

    visitIdentifier(identifier: AST.Identifier): any;

    visitPrimitive(primitive: AST.Primitive): any;

    visitAction(action: AST.Action): any;

    visitFlow(flow: AST.Flow): any;

    visitClass(astClass: AST.Class): any;

    visitParameter(parameter: AST.Parameter): any;

    visitModifier(modifier: AST.Modifier): any;

}
