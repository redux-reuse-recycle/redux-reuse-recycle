import 'mocha';
import { expect } from "chai";

import Logger from "../src/utils/Logger";
Logger.LogToConsole = false;

import ServiceFileGenerator from "../src/codegen/generators/ServiceFileGenerator";
import ServiceNode from "../src/codegen/ir/ServiceNode";
import FileCreator from '../src/utils/FileCreator';

describe("ActionFileGenerator",  () => {
    it("Produces the correct output for three actions", () => {
        let node = new ServiceNode('users');
        node.addServiceCase({type: 'GET_ALL_USERS', method: "GET", url: '/api/users'});
        node.addServiceCase({type: 'UPDATE_ALL_USERS', method: "POST", url: '/api/users'});
        let code = new ServiceFileGenerator(node).codeGen();
        // FileCreator(code, './service.js')
        expect(code).to.equal('export const getAllUsers = () => {\n' +
            '\tconst url = "/api/users";\n' +
            '\n' +
            '\tconst request = {\n' +
            '\t\tmethod: "GET",\n' +
            '\t};\n' +
            '\n' +
            '\treturn fetch(url, request);\n' +
            '};\n' +
            '\n' +
            'export const updateAllUsers = (payload) => {\n' +
            '\tconst url = "/api/users";\n' +
            '\n' +
            '\tconst request = {\n' +
            '\t\tmethod: "POST",\n' +
            '\t\theaders: { \'Content-Type\': \'application/json\' },\n' +
            '\t\tbody: JSON.stringify(payload),\n' +
            '\t};\n' +
            '\n' +
            '\treturn fetch(url, request);\n' +
            '};\n' +
            '\n')
    });
});
