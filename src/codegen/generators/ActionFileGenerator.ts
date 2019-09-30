import AbstractFileGenerator from "./AbstractFileGenerator";
import ActionsNode from '../ir/ActionsNode';

class ActionFileGenerator extends AbstractFileGenerator {
    private actionNode: ActionsNode;

    constructor(actionNode: ActionsNode) {
        super();
        this.actionNode = actionNode;
    }

    codeGen(): string {
        return '';
    }
}

export default ActionFileGenerator;
