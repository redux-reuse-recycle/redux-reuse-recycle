import AbstractFileGenerator from "./AbstractFileGenerator";
import ServiceCaseInterface from "../interfaces/ServiceCaseInterface";
import ServiceNode from "../ir/ServiceNode";

class ServiceFileGenerator extends AbstractFileGenerator {
    private serviceNode: ServiceNode;

    constructor(serviceNode: ServiceNode) {
        super();
        this.serviceNode = serviceNode;
    }

    private formatFunctionName(type: string): string {
        let functionName: string = "";
        const actionTypesArray = type.split("_");
        actionTypesArray.forEach((word: string, index: number) => {
            let firstLetter = '';
            if (index > 0) firstLetter = word.charAt(0).toUpperCase();
            else firstLetter = word.charAt(0).toLowerCase();
            const otherLetters = word.substring(1, word.length).toLowerCase();
            functionName += firstLetter + otherLetters;
        });
        return functionName;
    }

    private generateServices(): string {
        let services = "";
        this.serviceNode.serviceCases.forEach((serviceCase: ServiceCaseInterface) => {
            const hasBody =
                serviceCase.method === "POST" ||
                serviceCase.method === "PUT" ||
                serviceCase.method === "PATCH" ||
                serviceCase.method === "DELETE";
            services += `export const ${this.formatFunctionName(serviceCase.type)} = (${hasBody ? 'payload = {}' : ''}) => {\n`;
            services += `\tconst url = "${serviceCase.url}";\n\n`;
            services += `\tconst request = {\n`;
            services += `\t\tmethod: "${serviceCase.method}",\n`;
            if (hasBody) services += `\t\theaders: { 'Content-Type': 'application/json' },\n`;
            if (hasBody) services += `\t\tbody: JSON.stringify(payload),\n`;
            services += `\t};\n\n`;
            services += `\treturn fetch(url, request);\n`;
            services += `};\n\n`;
        });
        return services;
    }

    codeGen(): string {
        return this.generateServices();
    }
}

export default ServiceFileGenerator;
