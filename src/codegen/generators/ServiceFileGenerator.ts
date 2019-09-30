import AbstractFileGenerator from "./AbstractFileGenerator";
import ServiceNode from "../ir/ServiceNode";

class ServiceFileGenerator extends AbstractFileGenerator {
    private serviceNode: ServiceNode;

    constructor(serviceNode: ServiceNode) {
        super();
        this.serviceNode = serviceNode;
    }

    codeGen(): string {
        return '';
    }
}

export default ServiceFileGenerator;
