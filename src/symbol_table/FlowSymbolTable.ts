import Value from "../ast/Value";
import Flow from "../ast/Flow";
import SymbolTable from "./SymbolTable";

export default class FlowSymbolTable extends SymbolTable{

    public defineFlow(name: string, flow: Flow): void {
        throw new Error("Nested flows are not supported.");
    }

    public accessFlow(name: string): FlowSymbolTable {
        throw new Error("Nested flows are not supported.");
    }

    public accessDefinitionFromFlow(varName: string, flowName:string): Value{
        throw new Error("Nested flows are not supported.");
    }

}