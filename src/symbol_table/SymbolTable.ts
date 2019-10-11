import {Action} from "../ast";
import Value from "../ast/Value";
import Identifier from "../ast/Identifier";
import ParseError from "../errors/ParseError";
import TypeCheckError from "../errors/TypeCheckError";
import Logger from "../utils/Logger";

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

    public defineValueConstant(name: string, value: Value): void {
        // Check for membership
        if(this.valueConstants.has(name)){
            throw new TypeCheckError(name + " is already defined.");
        }
        this.valueConstants.set(name, value);

        Logger.Log("Symboltable define " + name);
    }

    public accessValueConstant(name: string): Value {
        let val = this.valueConstants.get(name);
        Logger.Log("Access " + name + ": " + val);
        if(val == null){
            throw new TypeCheckError("Unbound identifier: " + name);
        }

        if(val instanceof Identifier){
            return this.accessValueConstant(val.name);
        } else {
            return val;
        }
    }

    public defineAction(name: string, action: Action): void {
        // Check for membership
        if(this.actions.has(name)){
            throw new TypeCheckError(name + " is already defined.");
        }
        this.actions.set(name, action);
    }

    public accessAction(name: string): Action {
        let val = this.actions.get(name);
        if(val == null){
            throw new TypeCheckError("Unbound identifier: " + name);
        }

        if(val instanceof Identifier){
            return this.accessAction(val.name);
        } else {
            return val;
        }
    }

    public defineFlow(name: string): void {
        // Check for membership
        if(this.flows.has(name)){
            throw new TypeCheckError(name + " is already defined.");
        }
        this.flows.set(name, new FlowSymbolTable(this));
    }

    public accessFlow(name: string): FlowSymbolTable {
        let val = this.flows.get(name);
        if(val == null){
            throw new TypeCheckError("Unbound identifier: " + name);
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

export class FlowSymbolTable extends SymbolTable {
    private parentTable: SymbolTable;

    constructor(parent: SymbolTable) {
        super();
        this.parentTable = parent;
    }

    public defineValueConstant(name: string, value: Value): void {
        // Check for membership
        if (this.parentTable.valueConstants.has(name)) {
            throw new TypeCheckError(name + " is already defined.");
        }
        super.defineValueConstant(name, value);
    }

    // what if we are in a flow table looking for an ID in global scope?
    public accessValueConstant(name: string): Value {
        try{
            return super.accessValueConstant(name);
        } catch(e){
            return this.parentTable.accessValueConstant(name);
        }
    }

    public defineAction(name: string, action: Action): void {
        // Check for membership
        if (this.parentTable.actions.has(name)) {
            throw new TypeCheckError(name + " is already defined.");
        }
        super.defineAction(name, action);
    }

    // what if we are in a flow table looking for an ID in global scope?
    public accessAction(name: string): Action {
        try{
            return super.accessAction(name);
        } catch(e){
            return this.parentTable.accessAction(name);
        }
    }

    public defineFlow(name: string): void {
        throw new TypeCheckError("Nested flows are not supported.");
    }

    public accessFlow(name: string): FlowSymbolTable {
        throw new TypeCheckError("Nested flows are not supported.");
    }

    public accessDefinitionFromFlow(varName: string, flowName:string): Value{
        throw new ParseError("Nested flows are not supported.");
    }

}
