import FileReader from "./utils/FileReader";
import Tokenizer from "./Tokenizer";
import ParserVisitor from "./visitor/ParserVisitor";
import TypeCheckVisitor from "./visitor/TypeCheckVisitor";
import { ASTNode } from "./ast";

export default class Main {

  // Parses and Typechecks the FloScript File
  // and generates its Redux code.
  public static run(filePath: string) {
    const ast = this.parse(filePath);
    this.typecheck(ast);
    // TODO: Connect AST to CodeGen
  }

  public static parse(filePath: string, fileReader: FileReader = new FileReader()): ASTNode {
    const programText = fileReader.ReadProgram(filePath);
    const tokenizer = new Tokenizer(programText, filePath);
    return new ParserVisitor(tokenizer, fileReader).parse();
  }

  public static typecheck(ast: ASTNode): ASTNode {
    new TypeCheckVisitor().typecheck(ast);
    return ast;
  }
}
