import Tokenizer from "../../src/Tokenizer";
import Program from "./ProgramFile";
import { readdir, readFile } from "fs";

export default class TestFactory {

  // Reads all FloScript programs in the given directory.
  public static async readPrograms(directory: string): Promise<Program[]> {
    return new Promise((resolve, reject) => {
      readdir(directory, async (error, files) => {
        try {
          if (error) return reject(error);
          resolve(await Promise.all(files.map((file) => this.readProgram(`${directory}/${file}`))));
        }
        catch (error) {
          reject(error);
        }
      })
    });
  }

  // Reads the FloScript program at the given file.
  public static async readProgram(file: string): Promise<Program> {
    return new Promise((resolve, reject) => {
      readFile(file, (error, contents) => {
        if (error) reject(error);
        resolve(new Program(file, new Tokenizer(contents.toString(), file)));
      });
    });
  }
}
