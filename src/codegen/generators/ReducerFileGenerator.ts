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
        interface actionImportFilesInterface {[fileName: string]: string[]};
        let actionImportFiles: actionImportFilesInterface = {};
        this.reducerNode.variables.forEach((variable: ReducerVariableInterface) => {
            variable.modifiedBy.forEach((action: ActionInterface) => {
                if (actionImportFiles[action.fileName] && !actionImportFiles[action.fileName].includes(action.type)) {
                    actionImportFiles[action.fileName].push(action.type);
                } else if(!actionImportFiles[action.fileName]) {
                    actionImportFiles[action.fileName] = [action.type];
                }
            });
        });
        Object.keys(actionImportFiles).forEach((fileName: string) => {
            if (actionImportFiles[fileName].length > 1) {
                actionImports += `import {\n`;
                actionImportFiles[fileName].forEach((action: string) => {
                    actionImports += `\t${action},\n`;
                });
                actionImports += `} from "${fileName}";\n`;
            } else {
                actionImports += `import { ${actionImportFiles[fileName][0]} } from "${fileName}";\n`
            }
        });
        return actionImports;
    }

    private generateInitialState(): string {
        if (this.reducerNode.variables.length === 0) return "";
        let initialState: string = "const initialState = {\n";
        this.reducerNode.variables.forEach((variable: ReducerVariableInterface) => {
            initialState += `\t${variable.name}: ${variable.initialValue},\n`;
        });
        initialState += "};\n";
        return initialState;
    }

    private modifyVariableByActionClass(name: string, actionClass: string): string {
        switch(actionClass) {
            case 'network':
                return `action.payload || state.${name}`;
            case 'toggle':
                return `typeof action.payload === 'boolean' ? action.payload : !state.${name}`;
            case 'counter':
                return `typeof action.payload === 'number' ? action.payload : state.${name} + 1`;
            case 'stub':
            default:
                return name;
        }
    }

    private generateReducer(): string {
        let reducer = `export default function counterReducer(state = initialState, action = {}) {\n`;
        reducer += "\tswitch(action.type) {\n";
        interface actionVariableInterface { name: string; actionClass: string; };
        interface actionVariableMapInterface {[type: string]: actionVariableInterface[]};
        let actionVariableMap: actionVariableMapInterface = {};

        this.reducerNode.variables.forEach((variable: ReducerVariableInterface) => {
            variable.modifiedBy.forEach((action: ActionInterface) => {
                if (actionVariableMap[action.type]) {
                    actionVariableMap[action.type].push({
                        name: variable.name,
                        actionClass: action.actionClass,
                    });
                } else {
                    actionVariableMap[action.type] = [{
                        name: variable.name,
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
                reducer += `\t\t\t\t${actionVariable.name}: ${this.modifyVariableByActionClass(actionVariable.name, actionVariable.actionClass)},\n`;
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
