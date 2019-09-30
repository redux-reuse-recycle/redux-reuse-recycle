import ActionsNode from "../codegen/ir/ActionsNode";
import ProgramNode from "../codegen/ir/ProgramNode";
import ReducerNode from "../codegen/ir/ReducerNode";
import ServiceNode from "../codegen/ir/ServiceNode";

export default interface IRVisitor {
    visitActionsNode(actionsNode: ActionsNode): void;
    visitProgramNode(programNode: ProgramNode): void;
    visitReducerNode(reducerNode: ReducerNode): void;
    visitServiceNode(serviceNode: ServiceNode): void;
}
