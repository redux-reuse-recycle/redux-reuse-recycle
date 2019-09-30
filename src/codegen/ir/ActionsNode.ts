import AbstractNode from './AbstractNode';
import ActionInterface from '../interfaces/ActionInterface';
import IRVisitor from "../../visitor/IRVisitor";

class ActionsNode extends AbstractNode {
    public fileName: string;
    public actions: ActionInterface[] = [];

    constructor(fileName: string) {
        super();
        this.fileName = fileName;
    }

    public addAction(action: ActionInterface) {
        this.actions.push(action);
    }

    public acceptVisitor(visitor: IRVisitor) {
        visitor.visitActionsNode(this);
    }
}

export default ActionsNode;
