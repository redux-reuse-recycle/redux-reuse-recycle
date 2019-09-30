import 'mocha';
import { expect } from "chai";

import Logger from "../src/utils/Logger";
Logger.LogToConsole = false;

import ActionFileGenerator from "../src/codegen/generators/ActionFileGenerator";
import ActionsNode from "../src/codegen/ir/ActionsNode";
import FileCreator from '../src/utils/FileCreator';

describe("ActionFileGenerator",  () => {
    it("Produces the correct output for three actions", () => {
        let node = new ActionsNode('users');
        node.addAction({type: 'GET_ALL_USERS', actionNode: 'users', actionClass: "network", hasPayload: false});
        node.addAction({type: 'OPEN_MODAL', actionNode: 'users', actionClass: "toggle", hasPayload: false});
        node.addAction({type: 'SET_USER_LOGGED_IN', actionNode: 'users', actionClass: "toggle", hasPayload: false});
        let code = new ActionFileGenerator(node).codeGen();
        FileCreator(code, './actions.js')
        expect(code).to.equal('const GET_ALL_USERS = "GET_ALL_USERS";\n' +
            'const OPEN_MODAL = "OPEN_MODAL";\n' +
            'const SET_USER_LOGGED_IN = "SET_USER_LOGGED_IN";\n' +
            '\n' +
            'const getAllUsers = (payload) => ({\n' +
            '\ttype: GET_ALL_USERS,\n' +
            '\tpayload\n' +
            '});\n' +
            'const openModal = (payload) => ({\n' +
            '\ttype: OPEN_MODAL,\n' +
            '\tpayload\n' +
            '});\n' +
            'const setUserLoggedIn = (payload) => ({\n' +
            '\ttype: SET_USER_LOGGED_IN,\n' +
            '\tpayload\n' +
            '});\n')
    })

    it("Produces the correct output for one actions", () => {
        let node = new ActionsNode('users');
        node.addAction({type: 'GET_ALL_USERS', actionClass: "toggle", actionNode: 'users', hasPayload: false});
        let code = new ActionFileGenerator(node).codeGen();
        expect(code).to.equal('const GET_ALL_USERS = "GET_ALL_USERS";\n' +
            '\n' +
            'const getAllUsers = (payload) => ({\n' +
            '\ttype: GET_ALL_USERS,\n' +
            '\tpayload\n' +
            '});\n')
    })
});
