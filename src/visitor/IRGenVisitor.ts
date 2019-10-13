import * as AST from "../ast";
import SymbolTable from "../symbol_table/SymbolTable";
import DefaultASTVisitor from "./DefaultASTVisitor";
import ReducerNode from "../codegen/ir/ReducerNode";
import ActionInterface from "../codegen/interfaces/ActionInterface";
import ServiceCaseInterface from "../codegen/interfaces/ServiceCaseInterface";
import ReducerVariableInterface from "../codegen/interfaces/ReducerVariableInterface";
import ProgramNode from "../codegen/ir/ProgramNode";
import ActionsNode from "../codegen/ir/ActionsNode";
import ServiceNode from "../codegen/ir/ServiceNode";

export default class IRGenVisitor extends DefaultASTVisitor {

    private readonly table: SymbolTable;
    private readonly programNode: ProgramNode;
    private readonly actions: ActionInterface[];
    private readonly serviceCases: ServiceCaseInterface[];
    private currentDeclarationName: string;

    constructor(table: SymbolTable) {
        super();
        this.table = table;
        this.actions = [];
        this.serviceCases = [];
        this.programNode = new ProgramNode();
        this.currentDeclarationName = "";
    }

    getProgramNode(): ProgramNode {
        return this.programNode;
    }

    visitProgramFile(programFile: AST.ProgramFile): any {
        programFile.importStatements.forEach((i) => i.acceptASTVisitor(this));
        programFile.declarations.forEach((d) => d.acceptASTVisitor(this));

        this.programNode.reducerNodes.forEach((rNode) => {
            this.constructNodes(rNode.name);
        });
        this.constructNodes('default');
    }

    visitImportStatement(importStatement: AST.ImportStatement): any {
        (<AST.ProgramFile>importStatement.file).acceptASTVisitor(this);
    }

    visitDeclaration(declaration: AST.Declaration): any {
        const oldDeclerationName: string = this.currentDeclarationName;
        this.currentDeclarationName = declaration.id.name;
        declaration.value.acceptASTVisitor(this);
        this.currentDeclarationName = oldDeclerationName;
    }

    visitAction(action: AST.Action): any {
        const actionClass: AST.Class = action.clss;
        const actionInterface: ActionInterface = {
            type: this.currentDeclarationName,
            actionNode: 'default',
            actionClass: actionClass.toString(),
            hasPayload: !(actionClass instanceof AST.StubClass)
        };

        if (actionClass instanceof AST.NetworkClass) {
            let url: string = "";
            let method: string = "";

            action.params.forEach((p) => {
                if (p.name === "url") {
                    url = p.value.acceptASTVisitor(this);
                } else if (p.name === "method") {
                    method = p.value.acceptASTVisitor(this);
                }
            });
            const serviceCase: ServiceCaseInterface = {
                type: this.currentDeclarationName,
                url: url,
                method: method
            };
            this.serviceCases.push(serviceCase);
        }

        this.actions.push(actionInterface);
        return actionInterface;
    }

    visitFlow(flow: AST.Flow): any {
        const reducerNode = new ReducerNode(this.currentDeclarationName);
        const variables: ReducerVariableInterface[] = [];

        flow.declarations.forEach((d) => {
            if (d.value instanceof AST.Action) {
                const actionInterface: ActionInterface = d.acceptASTVisitor(this);
                actionInterface.actionNode = this.currentDeclarationName;
            } else {
                const variable: ReducerVariableInterface = {
                    variableName: d.id.name,
                    initialValue: (<AST.Primitive>this.table.accessDefinitionFromFlow(
                        d.id.name, this.currentDeclarationName)).toString(),
                    modifiedBy: [],
                };
                variables.push(variable);
            }
        });

        flow.modifiers.forEach((m) => {
            m.actions.forEach((id) => {
                let action = <ActionInterface>this.actions.find((a) => {
                    return a.type === id.name;
                });

                if (action.actionNode === 'default') {
                    action.actionNode = this.currentDeclarationName;
                } else {
                    action = {
                        type: action.type,
                        actionNode: this.currentDeclarationName,
                        actionClass: action.actionClass,
                        hasPayload: action.hasPayload
                    };
                    this.actions.push(action)
                }

                m.values.forEach((value) => {
                    const variable = <ReducerVariableInterface>variables.find((v) => {
                        return v.variableName === value.name;
                    });
                    variable.modifiedBy.push(<ActionInterface>action);
                });
            });
        });

        reducerNode.setReducerVariables(variables);
        this.programNode.addReducerNode(reducerNode);
    }

    visitIdentifier(identifier: AST.Identifier): any {
        return (<AST.Primitive>this.table.accessValueConstant(identifier.name)).value;
    }

    visitPrimitive(primitive: AST.Primitive): any {
        return primitive.value;
    }

    private constructNodes(name: string): void {
        const actionsNode = new ActionsNode(name);
        const serviceNode = new ServiceNode(name);

        const actions: ActionInterface[] = this.actions.filter((a) => {
            return a.actionNode === name;
        });
        actions.forEach((a) => {
            actionsNode.addAction(a);
            const service = this.serviceCases.find((s) => {
                return s.type === a.type;
            });
            if (service) {
                serviceNode.addServiceCase(service);
            }
        });
        this.programNode.addActionNode(actionsNode);
        this.programNode.addServiceNode(serviceNode);
    }
}
