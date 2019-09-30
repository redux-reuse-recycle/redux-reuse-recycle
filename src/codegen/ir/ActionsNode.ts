import AbstractNode from './AbstractNode';
import ActionInterface from '../interfaces/ActionInterface';
import IRVisitor from "../../visitor/IRVisitor";

class ActionsNode extends AbstractNode {
    public name: string;
    public actions: ActionInterface[] = [];

    constructor(name: string) {
        super();
        this.name = name;
    }

    public addAction(action: ActionInterface) {
        this.actions.push(action);
    }

    public acceptVisitor(visitor: IRVisitor) {
        visitor.visitActionsNode(this);
    }
}

export default ActionsNode;
