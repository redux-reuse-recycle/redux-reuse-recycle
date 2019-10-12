import * as fs from 'fs';
import Logger from "./Logger";

export default class FileReader {

    private static openFiles: string[] = [];

    public static ReadProgram(filePath: string): string {
        if (!this.openFiles.includes(filePath)) {
            this.openFiles.push(filePath);
            try {
                return fs.readFileSync(filePath).toString('utf-8');
            } catch(err) {
                Logger.Log(`Circular dependency ${filePath} detected`);
                throw err;
            }
        } else {
            const message = `Unable to load source: ${filePath}`;
            Logger.Log(message);
            throw new Error(message);
        }
    }

}
