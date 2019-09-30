import AbstractNode from "./AbstractNode";
import ActionsNode from "./ActionsNode";
import ReducerNode from "./ReducerNode";
import ServiceNode from "./ServiceNode";
import IRVisitor from "../../visitor/IRVisitor";

class ProgramNode {
    public readonly actionsNodes: AbstractNode[] = [];
    public readonly reducerNodes: AbstractNode[] = [];
    public readonly serviceNodes: AbstractNode[] = [];

    constructor() {}

    public addActionNode(actionNode: ActionsNode) {
        this.actionsNodes.push(actionNode);
    }

    public addReducerNode(actionNode: ReducerNode) {
        this.reducerNodes.push(actionNode);
    }

    public addServiceNode(actionNode: ServiceNode) {
        this.serviceNodes.push(actionNode);
    }

    public acceptVisitor(visitor: IRVisitor) {
        visitor.visitProgramNode(this);
    }
}

export default ProgramNode;
