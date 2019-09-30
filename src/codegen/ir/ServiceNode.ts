import AbstractNode from './AbstractNode';
import ServiceCaseInterface from "../interfaces/ServiceCaseInterface";
import IRVisitor from "../../visitor/IRVisitor";

class ServiceNode extends AbstractNode {
    public fileName: string;
    public serviceCases: ServiceCaseInterface[] = [];

    constructor(fileName: string) {
        super();
        this.fileName = fileName;
    }

    public addServiceCase(serviceCase: ServiceCaseInterface) {
        this.serviceCases.push(serviceCase);
    }

    public acceptVisitor(visitor: IRVisitor) {
        visitor.visitServiceNode(this);
    }
}

export default ServiceNode;
