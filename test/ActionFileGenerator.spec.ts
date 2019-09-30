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
        // FileCreator(code, './actions.js');
        expect(code).to.equal('import * as networkService from "../services/network.js";\n' +
            '\n' +
            'const GET_ALL_USERS_REQUEST = "GET_ALL_USERS_REQUEST";\n' +
            'const GET_ALL_USERS_ERROR = "GET_ALL_USERS_ERROR";\n' +
            'const GET_ALL_USERS_SUCCESS = "GET_ALL_USERS_SUCCESS";\n' +
            'const OPEN_MODAL = "OPEN_MODAL";\n' +
            'const SET_USER_LOGGED_IN = "SET_USER_LOGGED_IN";\n' +
            '\n' +
            'const getAllUsers = (payload) => {\n' +
            '\tconst request = networkService.getAllUsers(payload);\n' +
            '\n' +
            '\treturn (dispatch) => {\n' +
            '\t\tdispatch({ type: "GET_ALL_USERS_REQUEST" });\n' +
            '\n' +
            '\t\trequest.then((payload) => dispatch({\n' +
            '\t\t\ttype: "GET_ALL_USERS_SUCCESS", \n' +
            '\t\t\tpayload,\n' +
            '\t\t})).catch((error) => dispatch({\n' +
            '\t\t\ttype: "GET_ALL_USERS_ERROR",\n' +
            '\t\t\terror,\n' +
            '\t\t}));\n' +
            '\t}\n' +
            '}\n' +
            '\n' +
            'const openModal = (payload) => ({\n' +
            '\ttype: OPEN_MODAL,\n' +
            '\tpayload\n' +
            '});\n' +
            '\n' +
            'const setUserLoggedIn = (payload) => ({\n' +
            '\ttype: SET_USER_LOGGED_IN,\n' +
            '\tpayload\n' +
            '});\n' +
            '\n');
    });
    it("Produces the correct output for one actions", () => {
        let node = new ActionsNode('users');
        node.addAction({type: 'GET_ALL_USERS', actionClass: "toggle", actionNode: 'users', hasPayload: false});
        let code = new ActionFileGenerator(node).codeGen();
        // FileCreator(code, './actions.js');
        expect(code).to.equal('\n' +
            'const GET_ALL_USERS = "GET_ALL_USERS";\n' +
            '\n' +
            'const getAllUsers = (payload) => ({\n' +
            '\ttype: GET_ALL_USERS,\n' +
            '\tpayload\n' +
            '});\n' +
            '\n')
    });
});
