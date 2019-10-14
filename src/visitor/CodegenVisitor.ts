import IRVisitor from "./IRVisitor";
import ActionsNode from "../codegen/ir/ActionsNode";
import ReducerNode from '../codegen/ir/ReducerNode';
import ServiceNode from '../codegen/ir/ServiceNode';
import ProgramNode from '../codegen/ir/ProgramNode';
import AbstractNode from "../codegen/ir/AbstractNode";

import ActionFileGenerator from '../codegen/generators/ActionFileGenerator';
import ReducerFileGenerator from '../codegen/generators/ReducerFileGenerator';
import ServiceFileGenerator from '../codegen/generators/ServiceFileGenerator';

import { ConfigInterface } from "../Main";

import FileCreator from "../utils/FileCreator";

class CodegenVisitor implements IRVisitor {
    private config: ConfigInterface = {
        defaultFile: '',
        actionDirector: '',
        serviceDirectory: '',
        reducerDirectory: '',
    };

    constructor(_config: ConfigInterface) {
        this.config =_config;
    }

    visitActionsNode(actionsNode: ActionsNode): void {
        const file: string = new ActionFileGenerator(actionsNode, this.config).codeGen();
        FileCreator(file, this.config.actionDirector, `${actionsNode.name}.js`);
    }
    visitReducerNode(reducerNode: ReducerNode): void {
        const file: string = new ReducerFileGenerator(reducerNode, this.config).codeGen();
        FileCreator(file, this.config.reducerDirectory, `${reducerNode.name}.js`);
    }
    visitServiceNode(serviceNode: ServiceNode): void {
        const file: string = new ServiceFileGenerator(serviceNode, this.config).codeGen();
        FileCreator(file, this.config.serviceDirectory, `${serviceNode.name}.js`);
    }
    visitProgramNode(programNode: ProgramNode): void {
        const nodes: AbstractNode[] = [...programNode.actionsNodes, ...programNode.reducerNodes, ...programNode.serviceNodes];
        nodes.forEach((node: AbstractNode) => node.acceptVisitor(this));
    }
}

export default CodegenVisitor;
