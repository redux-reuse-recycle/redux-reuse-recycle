import Tokenizer from "../../src/Tokenizer";

export default class ProgramFile {
  public readonly fileName: string;
  public readonly program: Tokenizer;

  constructor(fileName: string, program: Tokenizer) {
    this.fileName = fileName;
    this.program = program;
  }
}
