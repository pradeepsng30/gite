'use strict';
const content = require('./content');

let getTextFromArray = function(arr, prefix){
    let text = "";
    arr.forEach(el => {
        text = text + '\n' + prefix + el.toString()
    })
    return text;
};

let getLongDesc = function (element) {
let longDesc = element.longDesc;
let text ="";
    if (!longDesc){
        return text;
    } 
    if (longDesc.required && longDesc.required.length > 0){
         text = text +'\nRequired Arguments:' + getTextFromArray(longDesc.required, '\t');
    }
    if (longDesc.optional && longDesc.optional.length > 0){
        text = text +'\n\nOptional Arguments:' + getTextFromArray(longDesc.optional, '\t');
    }
    if (longDesc.samples && longDesc.samples.length > 0){
        text = text +'\n\nSamples:' + getTextFromArray(longDesc.samples, `\t egit ${element.cmd} `);
    }
    text = text +'\n\n';
    return text;
}

let showHelpForCommand = function (element, showFull) {
    showFull = showFull || false;
    let result ="";
    if(showFull) {
        result = "\n" + "usage:\t egit " + element.cmd +  (element.args ? " " + element.args : "") + "\n\n";
        result = result + "Description:\n" + element.desc + "\n";
        result = result + (element.longDesc ? getLongDesc(element): "");
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
