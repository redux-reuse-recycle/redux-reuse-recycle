import AbstractFileGenerator from "./AbstractFileGenerator";
import ActionsNode from '../ir/ActionsNode';
import ActionInterface from "../interfaces/ActionInterface";

class ActionFileGenerator extends AbstractFileGenerator {
    private actionNode: ActionsNode;

    constructor(actionNode: ActionsNode) {
        super();
        this.actionNode = actionNode;
    }

    private generateConstants(): string {
        let constants: string = '';

        this.actionNode.actions.forEach((action: ActionInterface) => {
            constants += `const ${action.type} = "${action.type}";\n`;
        });

        return constants;
    }


    private formatFunctionName(actionType: string): string {
        let functionName: string = "";
        const actionTypesArray = actionType.split("_");
        actionTypesArray.forEach((word: string, index: number) => {
            let firstLetter = '';
            if (index > 0) firstLetter = word.charAt(0).toUpperCase();
            else firstLetter = word.charAt(0).toLowerCase();
            const otherLetters = word.substring(1, word.length).toLowerCase();
            functionName += firstLetter + otherLetters;
        });
        return functionName;
    }

    private generateActionCreators(): string {
        let functions: string = '';

        console.log('generateActionCreators');

        this.actionNode.actions.forEach((action: ActionInterface) => {
            functions += `const ${this.formatFunctionName(action.type)} = (payload) => ({\n` +
                    `\ttype: ${action.type},\n` + '\tpayload\n' + '});\n';
        });

        return functions;
    }

    codeGen(): string {
        return `${this.generateConstants()}\n${this.generateActionCreators()}`;
    }
}

export default ActionFileGenerator;
