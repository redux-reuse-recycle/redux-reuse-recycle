import AbstractNode from './AbstractNode';
import ReducerVariableInterface from "../interfaces/ReducerVariableInterface";
import IRVisitor from "../../visitor/IRVisitor";

class ReducerNode extends AbstractNode {
    public fileName: string;
    public variables: ReducerVariableInterface[] = [];

    constructor(fileName: string) {
        super();
        this.fileName = fileName;
    }

    public addReducerVariable(reducerVariable: ReducerVariableInterface) {
        this.variables.push(reducerVariable);
    }

    public acceptVisitor(visitor: IRVisitor) {
        visitor.visitReducerNode(this);
    }
}

export default ReducerNode;
