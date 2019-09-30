import AbstractNode from './AbstractNode';
import ServiceCaseInterface from "../interfaces/ServiceCaseInterface";
import ServiceFileGenerator from '../generators/ServiceFileGenerator';
import IRVisitor from "../../visitor/IRVisitor";

class ServiceNode extends AbstractNode {
    public name: string;
    public serviceCases: ServiceCaseInterface[] = [];

    constructor(name: string) {
        super();
        this.name = name;
    }

    public addServiceCase(serviceCase: ServiceCaseInterface) {
        this.serviceCases.push(serviceCase);
    }

    public acceptVisitor(visitor: IRVisitor) {
        visitor.visitServiceNode(this);
    }
}

export default ServiceNode;
