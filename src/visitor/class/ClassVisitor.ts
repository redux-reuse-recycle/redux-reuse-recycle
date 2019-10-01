import * as AST from "../../ast";

export default interface ClassVisitor {

    visitCounterClass(counterClass: AST.CounterClass): any;

    visitNetworkClass(networkClass: AST.NetworkClass): any;

    visitStubClass(stubClass: AST.StubClass): any;

    visitToggleClass(toggleClass: AST.ToggleClass): any;

}
