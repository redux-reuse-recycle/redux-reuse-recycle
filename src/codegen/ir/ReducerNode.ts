import AbstractNode from './AbstractNode';
import ReducerVariableInterface from "../interfaces/ReducerVariableInterface";
import IRVisitor from "../../visitor/IRVisitor";

class ReducerNode extends AbstractNode {
    public name: string;
    public variables: ReducerVariableInterface[] = [];

    constructor(name: string) {
        super();
        this.name = name;
    }

    public addReducerVariable(reducerVariable: ReducerVariableInterface) {
        this.variables.push(reducerVariable);
    }

    public setReducerVariables(reducerVariables: ReducerVariableInterface[]) {
        this.variables = reducerVariables;
    }

    public acceptVisitor(visitor: IRVisitor) {
        visitor.visitReducerNode(this);
    }
}

export default ReducerNode;
