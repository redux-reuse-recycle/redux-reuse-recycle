import {Action, Flow} from "../ast";

export default class SymbolTable {
    // TODO

    stringConstants: Map<string, any>;
    // action name -> action metadata
    // define ActionSymbolTable if necessary
    actions: Map<string, Action>;
    // flow name -> flow metadata
    // define FlowSymbolTable if necessary
    flows: Map<string, Flow>;

    constructor() {
        this.stringConstants = new Map();
        this.actions = new Map();
        this.flows = new Map();
    }

    public defineStringConstant(name: string, value: any): void {
        // Check for membership
        this.stringConstants.set(name, value);
    }

    public accessStringConstant(name: string): any {
        this.stringConstants.get(name);
    }

    public defineAction(name: string, action: Action): void {
        // Check for membership
        this.actions.set(name, action);
    }

    public accessAction(name: string): void {
        this.actions.get(name);
    }

    public defineFlow(name: string, flow: Flow): void {
        // Check for membership
        this.flows.set(name, flow);
    }

    public accessFlow(name: string): void {
        this.flows.get(name);
    }
}
