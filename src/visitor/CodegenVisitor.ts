import IRVisitor from "./IRVisitor";
import ActionsNode from "../codegen/ir/ActionsNode";
import ReducerNode from '../codegen/ir/ReducerNode';
import ServiceNode from '../codegen/ir/ServiceNode';
import ProgramNode from '../codegen/ir/ProgramNode';
import AbstractNode from "../codegen/ir/AbstractNode";

import ActionFileGenerator from '../codegen/generators/ActionFileGenerator';
import ReducerFileGenerator from '../codegen/generators/ReducerFileGenerator';
import ServiceFileGenerator from '../codegen/generators/ServiceFileGenerator';

import FileCreator from "../utils/FileCreator";

class CodegenVisitor implements IRVisitor {
    visitActionsNode(actionsNode: ActionsNode): void {
        const file: string = new ActionFileGenerator(actionsNode).codeGen();
        FileCreator(file, `/actions/${actionsNode.name}.js`);
    }
    visitReducerNode(reducerNode: ReducerNode): void {
        const file: string = new ReducerFileGenerator(reducerNode).codeGen();
        FileCreator(file, `/actions/${reducerNode.name}.js`);
    }
    visitServiceNode(serviceNode: ServiceNode): void {
        const file: string = new ServiceFileGenerator(serviceNode).codeGen();
        FileCreator(file, `/actions/${serviceNode.name}.js`);
    }
    visitProgramNode(programNode: ProgramNode): void {
        const nodes: AbstractNode[] = [...programNode.actionsNodes, ...programNode.reducerNodes, ...programNode.serviceNodes];
        nodes.forEach((node: AbstractNode) => node.acceptVisitor(this));
    }
}

export default CodegenVisitor;
