import {Action, Flow} from "../ast";
import Value from "../ast/Value";
import FlowSymbolTable from "./FlowSymbolTable";
import Identifier from "../ast/Identifier";

export default class SymbolTable {
    valueConstants: Map<string, Value>;
    // action name -> action metadata
    // define ActionSymbolTable if necessary
    actions: Map<string, Action>;
    // flow name -> flow metadata
    flows: Map<string, FlowSymbolTable>;

    constructor() {
        this.valueConstants = new Map();
        this.actions = new Map();
        this.flows = new Map();
    }

    public defineValueConstant(name: string, value: any): void {
        // Check for membership
        if(this.valueConstants.has(name)){
            throw new Error(name + " is already defined.");
        }
        this.valueConstants.set(name, value);
    }

    public accessValueConstant(name: string): Value {
        let val = this.valueConstants.get(name);
        if(val == null){
            throw new Error("Unbound identifier: " + name);
        }

        if(val instanceof Identifier){
            return this.accessValueConstant(val.name);
        } else {
            return val;
        }
    }

    public defineAction(name: string, action: Action): void {
        // Check for membership
        if(this.valueConstants.has(name)){
            throw new Error(name + " is already defined.");
        }
        this.actions.set(name, action);
    }

    public accessAction(name: string): Action {
        let val = this.actions.get(name);
        if(val == null){
            throw new Error("Unbound identifier: " + name);
        }

        if(val instanceof Identifier){
            return this.accessAction(val.name);
        } else {
            return val;
        }
    }

    public defineFlow(name: string, flow: Flow): void {
        // Check for membership
        if(this.valueConstants.has(name)){
            throw new Error(name + " is already defined.");
        }
        this.flows.set(name, new FlowSymbolTable());
    }

    public accessFlow(name: string): FlowSymbolTable {
        let val = this.flows.get(name);
        if(val == null){
            throw new Error("Unbound identifier: " + name);
        }

        if(val instanceof Identifier){
            return this.accessFlow(val.name);
        } else {
            return val;
        }
    }

    public accessDefinitionFromFlow(varName: string, flowName:string): Value{
        //  check inside flow first otherwise look for global
        let f = this.accessFlow(flowName);

        try{
            return f.accessValueConstant(varName);
        } catch (e){
            return this.accessValueConstant(varName);
        }

    }

    public accessActionDefinitionFromFlow(varName: string, flowName:string): Action{
        // check inside flow first otherwise global
        let f = this.accessFlow(flowName);

        try {
            return f.accessAction(varName);
        } catch (e){
            return this.accessAction(varName);
        }

    }
}
