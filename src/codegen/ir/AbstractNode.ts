import IRVisitor from "../../visitor/IRVisitor";

abstract class AbstractNode {
    public name: string;
    public abstract acceptVisitor(visitor: IRVisitor): any;
}

export default AbstractNode;
