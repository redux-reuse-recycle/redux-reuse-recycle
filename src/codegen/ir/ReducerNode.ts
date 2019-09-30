import AbstractNode from './AbstractNode';
import ReducerVariableInterface from "../interfaces/ReducerVariableInterface";
import ReducerFileGenerator from '../generators/ReducerFileGenerator';
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

    public acceptVisitor(visitor: IRVisitor) {
        visitor.visitReducerNode(this);
    }
}

export default ReducerNode;
