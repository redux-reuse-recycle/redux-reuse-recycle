import Value from "./Value";
import Declaration from "./Declaration";
import Modifier  from "./Modifier";
import ASTVisitor from "../visitor/ASTVisitor";

export default class Flow extends Value {
    public readonly  name: string;
    public readonly declarations: Declaration[];
    public readonly modifiers: Modifier[];

    constructor(name: string, declarations: Declaration[], modifiers: Modifier[]) {
        super();
        this.name = name;
        this.declarations = declarations;
        this.modifiers = modifiers;
    }

    acceptASTVisitor(visitor: ASTVisitor): any {
        return visitor.visitFlow(this);
    }

}
