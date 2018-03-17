'use strict';
const content = require('./content');

let showHelpForCommand = function (element, showFull) {
    showFull = showFull || false;
    let result ="";
    if(showFull) {
        result = "\n" + "usage:\t egit " + element.cmd +  (element.args ? " " + element.args : "") + "\n\n";
        result = result + "Description:\t" + element.desc + "\n";
        result = result + (element.longDesc ? element.longDesc: "");
    }
    else {
        result = "\t" + padding(element.cmd.split(' ')[0],30) + "\t" + element.desc;
    }
    console.log(result);
}

let padding = function (str, pad, char) {
    char = char || ' ';
    if (str.length >= pad) {
        return str;
    }
    return str + Array(pad-str.length).join(char);
}


let showHelpForCommands = function (elements, showFull) {
    showFull = showFull || false;
    elements.forEach(element => {
        showHelpForCommand(element, showFull);
    });
}

let showHelpGlobal = (commandList) => {
    console.log(content.usage);
    console.log(content.commandsHeader);
    showHelpForCommands(commandList);
    console.log(content.optionsHeader);
    // TODO : options
    console.log(content.helpFooter);
}

module.exports.showHelpForCommand = showHelpForCommand;
module.exports.showHelpForCommands = showHelpForCommands;
module.exports.showHelpGlobal = showHelpGlobal;
