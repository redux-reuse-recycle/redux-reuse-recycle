import * as AST from "../../ast";
import ClassVisitor from "./ClassVisitor";

export default abstract class DefaultClassVisitor implements ClassVisitor {

    visitCounterClass(counterClass: AST.CounterClass): any {
        return counterClass;
    }

    visitNetworkClass(networkClass: AST.NetworkClass): any {
        return networkClass;
    }

    visitStubClass(stubClass: AST.StubClass): any {
        return stubClass;
    }

    visitToggleClass(toggleClass: AST.ToggleClass): any {
        return toggleClass;
    }

}
