import AbstractFileGenerator from "./AbstractFileGenerator";
import ActionsNode from '../ir/ActionsNode';
import ActionInterface from "../interfaces/ActionInterface";
import { ConfigInterface } from '../../Main';

class ActionFileGenerator extends AbstractFileGenerator {
    private actionNode: ActionsNode;
    private config: ConfigInterface;

    constructor(actionNode: ActionsNode, config: ConfigInterface) {
        super();
        this.actionNode = actionNode;
        this.config = config;
    }

    private generateImports(): string {
        let imports: string = '';
        let importedServices: string[] = [];
        this.actionNode.actions.forEach((action: ActionInterface) => {
            if (action.actionClass === "network" && !importedServices.includes(action.actionClass)) {
                importedServices.push(action.actionClass);
                imports += `import * as ${action.actionClass}Service from "../${this.config.serviceDirectory}/${this.actionNode.name}.js";\n`
            }
        });
        return imports += '\n';
    }

    private generateConstants(): string {
        let constants: string = '';
        this.actionNode.actions.forEach((action: ActionInterface) => {
            if (action.actionClass === "network") {
                constants += `export const ${action.type}_REQUEST = "${action.type}_REQUEST";\n`;
                constants += `export const ${action.type}_ERROR = "${action.type}_ERROR";\n`;
                constants += `export const ${action.type}_SUCCESS = "${action.type}_SUCCESS";\n`;
            } else {
                constants += `export const ${action.type} = "${action.type}";\n`;
            }
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
        this.actionNode.actions.forEach((action: ActionInterface) => {
            if (action.actionClass === "network" ) {
                functions += `export const ${this.formatFunctionName(action.type)} = (payload) => {\n`;
                functions += `\tconst request = ${action.actionClass}Service.${this.formatFunctionName(action.type)}(payload);\n\n`;
                functions += `\treturn (dispatch) => {\n`;
                functions += `\t\tdispatch({ type: ${action.type}_REQUEST });\n\n`;
                functions += `\t\trequest.then((payload) => dispatch({\n`;
                functions += `\t\t\ttype: ${action.type}_SUCCESS, \n`;
                functions += `\t\t\tpayload,\n`;
                functions += `\t\t})).catch((error) => dispatch({\n`;
                functions += `\t\t\ttype: ${action.type}_ERROR,\n`;
                functions += `\t\t\terror,\n`;
                functions += `\t\t}));\n`;
                functions += `\t}\n`;
                functions += `};\n\n`;
            } else {
                functions += `export const ${this.formatFunctionName(action.type)} = (payload) => ({\n`;
                functions += `\ttype: ${action.type},\n` + '\tpayload\n' + '});\n\n';
            }
        });
        return functions;
    }

    codeGen(): string {
        return `${this.generateImports()}${this.generateConstants()}\n${this.generateActionCreators()}`;
    }
}

export default ActionFileGenerator;
