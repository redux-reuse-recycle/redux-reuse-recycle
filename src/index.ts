import Main from "./Main";

export const main = () => {
    let configFile;
    try {
        configFile = require(process.cwd() + "/floscript.config.js");
    } catch {
        console.log('No config file specified.');
    }
    const argv = require('yargs').argv;

    const config = {
        defaultFile: argv.defaultFile || configFile && configFile.defaultFile || "",
        actionDirector: argv.actionDirector || configFile && configFile.actionDirector || "actions",
        serviceDirectory: argv.serviceDirectory || configFile && configFile.serviceDirectory || "services",
        reducerDirectory: argv.reducerDirectory || configFile && configFile.reducerDirectory || "reducers",
    };

    if (!config.defaultFile && !argv.defaultFile) throw new Error("No default FloScript file specified.");

    Main.run(config);
    return 0;
};

main();
