import ASTNode from "./ASTNode";
import Identifier from "./Identifier";
import ProgramFile from "./ProgramFile";

export default class ImportStatement extends ASTNode {
  public readonly filePath: string;
  public readonly id: Identifier;
  public readonly file: ProgramFile;

  constructor(filePath: string, id: Identifier) {
    super();
    this.filePath = filePath;
    this.id = id;

    // TODO: Recursively Parse ProgramFile from filepath.
    this.file = new ProgramFile([], []);
  }
}
