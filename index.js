'use strict';
const input_args = require('yargs').argv;
const args = input_args._
const options = input_args;
const command = args[0];

const commandList = require('./config').commandList;

let getRelatedCommands = (command) => {
    return commandList.filter(element => {
       return element.cmd.split(' ')[0].indexOf(command) !== -1 && (command.length >=4)
    });
}

let getCommandConfig = function (command) {
    return commandList.filter(element =>{
        return element.cmd.split(' ')[0] === command;
    })[0];
}

let showHelpForCommand = function (element, showFull) {
        showFull = showFull || false;
    let result ="";
    if(showFull) {
        result = "\n" + "usage:\t egit " + element.cmd + "\n\n"
        result = result + "Description:\t" + element.desc + "\n"
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

let showHelpGlobal = () => {
    let content = require('./content')
    console.log(content.usage);
    console.log(content.commandsHeader);
    showHelpForCommands(commandList);
    console.log(content.optionsHeader);
    // options
    console.log(content.helpFooter);
}

// console.log(args, options, command);

// console.log(getRelatedCommands(command));
// console.log(getCommandConfig(command));
// console.log(commandList);
//showHelpGlobal();
showHelpForCommand(commandList[0], true);
//console.log('a','b');
//console.log(padding('hjgshjgeskhgskjhgskgjh',10),'t');

