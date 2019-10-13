import { join } from "path";
import { dirname } from "path";

import Identifier from "./Identifier";
import ASTVisitor from "../visitor/ASTVisitor";
import Main from "../Main";
import FileReader from "../utils/FileReader";
import * as AST from "./index";

export default class ImportStatement extends AST.ASTNode {
    public readonly filePath: string;
    public readonly id: Identifier;
    public file?: AST.ProgramFile;

    // The fileContext represents the directory from which to parse the import file.
    constructor(filePath: string, id: Identifier) {
        super();
        this.filePath = filePath;
        this.id = id;
    }

    parseImportFile(fileContext: string, fileReader: FileReader): void {
        const importFileReader = new FileReader(fileReader.openedFiles);
        this.file = Main.parse(this.getCanonicalFilePath(fileContext), importFileReader);
    }

    acceptASTVisitor(visitor: ASTVisitor): any {
        return visitor.visitImportStatement(this);
    }

    // Gets the file path with respect to the FloScript parsing execution.
    private getCanonicalFilePath(fileContext: string) {
        const parsedPath = this.filePath.slice(1, this.filePath.length - 1) + ".flo";
        return join(dirname(fileContext), parsedPath);
    }
}
