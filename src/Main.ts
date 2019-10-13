import FileReader from "./utils/FileReader";
import Tokenizer from "./Tokenizer";
import ParserVisitor from "./visitor/ParserVisitor";
import TypeCheckVisitor from "./visitor/TypeCheckVisitor";
import * as AST from "./ast";
import IRGenVisitor from "./visitor/IRGenVisitor";
import SymbolTable from "./symbol_table/SymbolTable";
import ProgramNode from "./codegen/ir/ProgramNode";
import CodegenVisitor from "./visitor/CodegenVisitor";

export default class Main {

  // Parses and Typechecks the FloScript File
  // and generates its Redux code.
  public static run(filePath: string) {
    const ast: AST.ASTNode = this.parse(filePath);
    const table: SymbolTable = this.typecheck(ast);
    const ir: ProgramNode = this.irgen(ast, table);
    this.codegen(ir);
  }

  public static parse(filePath: string, fileReader: FileReader = new FileReader()): AST.ProgramFile {
    const programText = fileReader.ReadProgram(filePath);
    const tokenizer = new Tokenizer(programText, filePath);
    return new ParserVisitor(tokenizer, fileReader).parse();
  }

  public static typecheck(ast: AST.ASTNode): SymbolTable {
    const visitor: TypeCheckVisitor = new TypeCheckVisitor();
    visitor.typecheck(ast);
    return visitor.getSymbolTable();
  }

  public static irgen(ast: AST.ASTNode, table: SymbolTable): ProgramNode {
    const visitor: IRGenVisitor = new IRGenVisitor(table);
      ast.acceptASTVisitor(visitor);
      return visitor.getProgramNode();
  }

  public static codegen(ir: ProgramNode) {
    const visitor: CodegenVisitor = new CodegenVisitor();
    ir.acceptVisitor(visitor);
    // Done?
  }

}
