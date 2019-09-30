import 'mocha';
import { expect } from "chai";

import Logger from "../src/utils/Logger";
Logger.LogToConsole = false;

import ReducerFileGenerator from "../src/codegen/generators/ReducerFileGenerator";
import ReducerNode from "../src/codegen/ir/ReducerNode";
import FileCreator from '../src/utils/FileCreator';

describe("ReducerFileGenerator",  () => {
    it("Produces the correct output for one action", () => {
        let node = new ReducerNode('USERS');
        node.addReducerVariable({
            name: 'hasUsersBeenFetched',
            initialValue: 'false',
            modifiedBy: [
                {
                    type: 'SET_USERS_BEEN_FETCHED',
                    actionClass: "toggle",
                    fileName: './actions/users.js',
                    hasPayload: true,
                },
            ],
        });
        node.addReducerVariable({
            name: 'users1',
            initialValue: '[]',
            modifiedBy: [
                {
                    type: 'GET_ALL_USERS',
                    actionClass: "network",
                    fileName: './actions/users.js',
                    hasPayload: true,
                },
                {
                    type: 'DELETE_ALL_USERS',
                    actionClass: "network",
                    fileName: './actions/users.js',
                    hasPayload: true,
                },
            ],
        });
        node.addReducerVariable({
            name: 'users2',
            initialValue: '[]',
            modifiedBy: [
                {
                    type: 'GET_ALL_USERS',
                    actionClass: "network",
                    fileName: './actions/users.js',
                    hasPayload: true,
                },
                {
                    type: 'DELETE_ALL_USERS',
                    actionClass: "network",
                    fileName: './actions/users.js',
                    hasPayload: true,
                },
            ],
        });
        let code = new ReducerFileGenerator(node).codeGen();
        FileCreator(code, './reducer.js');
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
    });
});
