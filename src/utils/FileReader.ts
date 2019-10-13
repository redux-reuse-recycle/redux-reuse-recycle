import * as fs from 'fs';
import Logger from "./Logger";

export default class FileReader {

    public readonly openedFiles: string[];

    constructor(filesAlreadyOpened: string[] = []) {
        this.openedFiles = filesAlreadyOpened.slice();
    }

    public ReadProgram(filePath: string): string {
        if (!this.openedFiles.includes(filePath)) {
            this.openedFiles.push(filePath);
            try {
                return fs.readFileSync(filePath).toString('utf-8');
            } catch(err) {
                Logger.Log(`Unable to load source: ${filePath}`);
                throw err;
            }
        } else {
            const message = `Circular dependency ${filePath} detected`;
            Logger.Log(message);
            throw new Error(message);
        }
    }
}
