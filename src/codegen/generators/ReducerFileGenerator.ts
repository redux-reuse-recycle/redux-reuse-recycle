import AbstractFileGenerator from "./AbstractFileGenerator";
import ReducerNode from '../ir/ReducerNode';

class ReducerFileGenerator extends AbstractFileGenerator {
    private reducerNode: ReducerNode;

    constructor(reducerNode: ReducerNode) {
        super();
        this.reducerNode = reducerNode;
    }

    codeGen(): string {
        return '';
    }
}

export default ReducerFileGenerator;
