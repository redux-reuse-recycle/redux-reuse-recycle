import * as fs from 'fs';
import Logger from "./Logger";

export default class FileReader {

    private static openFiles: string[] = [];

    public static ReadProgram(filePath: string): string {
        if (!this.openFiles.includes(filePath)) {
            this.openFiles.push(filePath);
            try {
                fs.readFileSync(filePath).toString('utf-8');
            } catch(err) {
                Logger.Log(`Circular dependency ${filePath} detected`);
            }
        } else {
            Logger.Log(`Unable to load source: ${filePath}`)
        }
    }

}
