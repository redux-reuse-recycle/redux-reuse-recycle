import 'mocha';
import { expect } from "chai";

import Logger from "../src/utils/Logger";
Logger.LogToConsole = false;

import ReducerFileGenerator from "../src/codegen/generators/ReducerFileGenerator";
import ReducerNode from "../src/codegen/ir/ReducerNode";
import FileCreator from '../src/utils/FileCreator';

describe("ReducerFileGenerator",  () => {
    it("Produces the correct output for a few reducers", () => {
        let node = new ReducerNode('users');
        node.addReducerVariable({
            variableName: 'hasUsersBeenFetched',
            initialValue: 'false',
            modifiedBy: [
                {
                    type: 'SET_USERS_BEEN_FETCHED',
                    actionClass: "toggle",
                    actionNode: 'users',
                    hasPayload: true,
                },
            ],
        });
        node.addReducerVariable({
            variableName: 'users1',
            initialValue: '[]',
            modifiedBy: [
                {
                    type: 'GET_ALL_USERS',
                    actionClass: "network",
                    actionNode: 'users',
                    hasPayload: true,
                },
                {
                    type: 'DELETE_ALL_USERS',
                    actionClass: "network",
                    actionNode: 'users',
                    hasPayload: true,
                },
            ],
        });
        node.addReducerVariable({
            variableName: 'users2',
            initialValue: '[]',
            modifiedBy: [
                {
                    type: 'GET_ALL_USERS',
                    actionClass: "network",
                    actionNode: 'users',
                    hasPayload: true,
                },
                {
                    type: 'DELETE_ALL_USERS',
                    actionClass: "network",
                    actionNode: 'users',
                    hasPayload: true,
                },
            ],
        });
        let code = new ReducerFileGenerator(node).codeGen();
        // FileCreator(code, './reducer.js');
        expect(code).to.equal('import {\n' +
            '\tSET_USERS_BEEN_FETCHED,\n' +
            '\tGET_ALL_USERS,\n' +
            '\tDELETE_ALL_USERS,\n' +
            '} from "../actions/users.js";\n' +
            '\n' +
            'const initialState = {\n' +
            '\thasUsersBeenFetched: false,\n' +
            '\tusers1: [],\n' +
            '\tusers2: [],\n' +
            '\tmeta: {\n' +
            '\t\tloading: false,\n' +
            '\t\terror: null,\n' +
            '\t},\n' +
            '};\n' +
            '\n' +
            'export default function counterReducer(state = initialState, action = {}) {\n' +
            '\tswitch(action.type) {\n' +
            '\t\tcase SET_USERS_BEEN_FETCHED:\n' +
            '\t\t\treturn{\n' +
            '\t\t\t\t...state,\n' +
            '\t\t\t\thasUsersBeenFetched: typeof action.payload === \'boolean\' ? action.payload : !state.hasUsersBeenFetched,\n' +
            '\t\t\t};\n' +
            '\t\tcase GET_ALL_USERS_REQUEST:\n' +
            '\t\t\treturn{\n' +
            '\t\t\t\t...state,\n' +
            '\t\t\t\tmeta: {\n' +
            '\t\t\t\t\tloading: true,\n' +
            '\t\t\t\t\terror: null,\n' +
            '\t\t\t\t},\n' +
            '\t\t\t};\n' +
            '\t\tcase GET_ALL_USERS_SUCCESS:\n' +
            '\t\t\treturn{\n' +
            '\t\t\t\t...state,\n' +
            '\t\t\t\tusers1: action.payload ? action.payload : state.users1,\n' +
            '\t\t\t\tusers2: action.payload ? action.payload : state.users2,\n' +
            '\t\t\t};\n' +
            '\t\tcase DELETE_ALL_USERS_REQUEST:\n' +
            '\t\t\treturn{\n' +
            '\t\t\t\t...state,\n' +
            '\t\t\t\tmeta: {\n' +
            '\t\t\t\t\tloading: true,\n' +
            '\t\t\t\t\terror: null,\n' +
            '\t\t\t\t},\n' +
            '\t\t\t};\n' +
            '\t\tcase DELETE_ALL_USERS_SUCCESS:\n' +
            '\t\t\treturn{\n' +
            '\t\t\t\t...state,\n' +
            '\t\t\t\tusers1: action.payload ? action.payload : state.users1,\n' +
            '\t\t\t\tusers2: action.payload ? action.payload : state.users2,\n' +
            '\t\t\t};\n' +
            '\t\tdefault:\n' +
            '\t\t\treturn state;\n' +
            '\t}\n' +
            '}\n')
    });
});
