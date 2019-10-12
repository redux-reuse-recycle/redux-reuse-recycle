import { join } from "path";

import ASTNode from "./ASTNode";
import Identifier from "./Identifier";
import ASTVisitor from "../visitor/ASTVisitor";
import Main from "../Main";

export default class ImportStatement extends ASTNode {
    public readonly filePath: string;
    public readonly id: Identifier;
    public readonly file: ASTNode;

    // The fileContext represents the directory from which to parse the import file.
    constructor(filePath: string, id: Identifier, fileContext: string = ".") {
        super();
        this.filePath = filePath;
        this.id = id;

        this.file = Main.parse(this.getCanonicalFilePath(fileContext));
    }

    acceptASTVisitor(visitor: ASTVisitor): any {
        return visitor.visitImportStatement(this);
    }

    // Gets the file path with respect to the FloScript parsing execution.
    private getCanonicalFilePath(fileContext: string) {
        const parsedPath = this.filePath.slice(1, this.filePath.length - 1) + ".flo";
        return join(fileContext, parsedPath);
    }
}
