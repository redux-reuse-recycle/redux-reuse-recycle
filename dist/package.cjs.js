'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.Log = function (message) {
        if (!this.LogToConsole)
            return;
        console.log(message);
    };
    Logger.LogToConsole = true;
    return Logger;
}());

var main = function () {
    Logger.Log("Hello World!");
    return 0;
};
main();

exports.main = main;
