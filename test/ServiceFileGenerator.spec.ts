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
        FileCreator(code, './service.js')
        // expect(code).to.equal('const GET_ALL_USERS = "GET_ALL_USERS";\n' +
        //     'const OPEN_MODAL = "OPEN_MODAL";\n' +
        //     'const SET_USER_LOGGED_IN = "SET_USER_LOGGED_IN";\n' +
        //     '\n' +
        //     'const getAllUsers = (payload) => ({\n' +
        //     '\ttype: GET_ALL_USERS,\n' +
        //     '\tpayload\n' +
        //     '});\n' +
        //     'const openModal = (payload) => ({\n' +
        //     '\ttype: OPEN_MODAL,\n' +
        //     '\tpayload\n' +
        //     '});\n' +
        //     'const setUserLoggedIn = (payload) => ({\n' +
        //     '\ttype: SET_USER_LOGGED_IN,\n' +
        //     '\tpayload\n' +
        //     '});\n')
    })
});
