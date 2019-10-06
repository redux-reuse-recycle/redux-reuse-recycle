'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Logger {
    static Log(message) {
        if (!this.LogToConsole)
            return;
        console.log(message);
    }
}
Logger.LogToConsole = true;

/*
// Example of import ast nodes (for Brian).
import * as AST from "./ast";
const myVar = new AST.Program();
*/
const main = () => {
    Logger.Log("Hello World!");
    return 0;
};
main();

exports.main = main;
