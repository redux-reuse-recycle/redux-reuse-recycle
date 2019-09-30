import AbstractFileGenerator from "./AbstractFileGenerator";
import ReducerNode from '../ir/ReducerNode';
import ReducerVariableInterface from '../interfaces/ReducerVariableInterface';
import ActionInterface from "../interfaces/ActionInterface";

class ReducerFileGenerator extends AbstractFileGenerator {
    private reducerNode: ReducerNode;

    constructor(reducerNode: ReducerNode) {
        super();
        this.reducerNode = reducerNode;
    }

    private generateActionImports(): string {
        let actionImports: string = "";
        interface actionImportNodesInterface {[actionNode: string]: string[]};
        let actionImportNodes: actionImportNodesInterface = {};
        this.reducerNode.variables.forEach((variable: ReducerVariableInterface) => {
            variable.modifiedBy.forEach((action: ActionInterface) => {
                if (actionImportNodes[action.actionNode] && !actionImportNodes[action.actionNode].includes(action.type)) {
                    actionImportNodes[action.actionNode].push(action.type);
                } else if(!actionImportNodes[action.actionNode]) {
                    actionImportNodes[action.actionNode] = [action.type];
                }
            });
        });
        Object.keys(actionImportNodes).forEach((actionNode: string) => {
            if (actionImportNodes[actionNode].length > 1) {
                actionImports += `import {\n`;
                actionImportNodes[actionNode].forEach((action: string) => {
                    actionImports += `\t${action},\n`;
                });
                actionImports += `} from "../actions/${actionNode}.js";\n`;
            } else {
                actionImports += `import { ${actionImportNodes[actionNode][0]} } from "../actions/${actionNode}.js";\n`
            }
        });
        return actionImports;
    }

    private generateInitialState(): string {
        if (this.reducerNode.variables.length === 0) return "";
        let initialState: string = "const initialState = {\n";
        this.reducerNode.variables.forEach((variable: ReducerVariableInterface) => {
            initialState += `\t${variable.variableName}: ${variable.initialValue},\n`;
        });
        initialState += "};\n";
        return initialState;
    }

    private modifyVariableByActionClass(variableName: string, actionClass: string): string {
        switch(actionClass) {
            case 'network':
                return `action.payload || state.${variableName}`;
            case 'toggle':
                return `typeof action.payload === 'boolean' ? action.payload : !state.${variableName}`;
            case 'counter':
                return `typeof action.payload === 'number' ? action.payload : state.${variableName} + 1`;
            case 'stub':
                return `state.${variableName}`;
            default:
                return variableName;
        }
    }

    private generateReducer(): string {
        let reducer = `export default function counterReducer(state = initialState, action = {}) {\n`;
        reducer += "\tswitch(action.type) {\n";
        interface actionVariableInterface { variableName: string; actionClass: string; };
        interface actionVariableMapInterface {[type: string]: actionVariableInterface[]};
        let actionVariableMap: actionVariableMapInterface = {};

        this.reducerNode.variables.forEach((variable: ReducerVariableInterface) => {
            variable.modifiedBy.forEach((action: ActionInterface) => {
                if (actionVariableMap[action.type]) {
                    actionVariableMap[action.type].push({
                        variableName: variable.variableName,
                        actionClass: action.actionClass,
                    });
                } else {
                    actionVariableMap[action.type] = [{
                        variableName: variable.variableName,
                        actionClass: action.actionClass,
                    }];
                }
            });
        });
        Object.keys(actionVariableMap).forEach((type: string) => {
            reducer += `\t\tcase ${type}:\n`;
            reducer += "\t\t\treturn{\n";
            reducer += "\t\t\t\t...state,\n";
            actionVariableMap[type].forEach((actionVariable: actionVariableInterface) => {
                reducer += `\t\t\t\t${actionVariable.variableName}: ${this.modifyVariableByActionClass(actionVariable.variableName, actionVariable.actionClass)},\n`;
            });
            reducer += "\t\t\t};\n";
        });
        reducer += "\t\tdefault:\n\t\t\treturn state;\n\t}\n}\n";
        return reducer;
    }

    codeGen(): string {
        return `${this.generateActionImports()}\n${this.generateInitialState()}\n${this.generateReducer()}`;
    }
}

export default ReducerFileGenerator;
