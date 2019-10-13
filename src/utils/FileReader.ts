import * as fs from 'fs';
import Logger from "./Logger";
import ParseError from "../errors/ParseError";

export default class FileReader {

    public readonly openedFiles: string[];

    constructor(filesAlreadyOpened: string[] = []) {
        this.openedFiles = filesAlreadyOpened.slice();
    }

    public ReadProgram(filePath: string): string {
        if (!fs.existsSync(filePath)) {
            throw new ParseError(`File ${filePath} does not exist!`);
        }

        if (!this.openedFiles.includes(filePath)) {
            this.openedFiles.push(filePath);
            try {
                return fs.readFileSync(filePath).toString('utf-8');
            } catch(err) {
                Logger.Log(`Unable to load source: ${filePath}`);
                throw err;
            }
        } else {
            throw new ParseError(`Circular dependency ${filePath} detected`);
        }
    }
}
