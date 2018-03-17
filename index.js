#!/usr/bin/env node
'use strict';
const input_args = require('yargs').argv;
const args = input_args._
const options = input_args;
const command = args[0];
const content = require('./content');
const commandList = require('./config').commandList;
const pkg = require('./package.json');

let getRelatedCommands = (command) => {
    return commandList.filter(element => {
       return element.cmd.split(' ')[0].indexOf(command) !== -1 && (command.length >=4)
    });
}

let getCommandConfig = function (command) {
    return commandList.filter(element =>{
        return element.cmd === command;
    })[0];
}

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

let showHelpGlobal = () => {
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
//showHelpForCommand(commandList[0], true);
//console.log('a','b');
//console.log(padding('hjgshjgeskhgskjhgskgjh',10),'t');


let mapAndExecute = function (element) {
    let cmdsToexec = element.execCommands.map(cmdObj => {
        return
    });
}

let validate = function (element) {
    let result = {};
    if (element.args) {
        console.log(args);
        let requiredArgs = element.args.split(' ').forEach( (arg,i) => {
            let argName = '';
            if(arg.length <= 3) {
                throw Error("invalid arg list in config");
            }
            argName = arg.slice(1,-1);
            if(arg[0] == '<' && arg[arg.length-1] == '>') {
                if(i+1 >= args.length) {
                    throw Error(`missing required argument: ${argName}`);
                }
                result[argName] = args[i+1];
            } else if(arg[0] == '[' && arg[arg.length-1] == ']') {
                if(i+1 < args.length) {
                    result[argName] = args[i+1];
                }
            }
            else {
                throw Error("invalid arg list in config");
            }
        });

    }

    return result;
    
}

if (command){
    let commandConfig = getCommandConfig(command);
    if (commandConfig){
        if (options.h){ 
            showHelpForCommand(commandConfig, true);
        } else {
                    // exec comand
           // mapAndExecute(commandConfig);
           console.log(validate(commandConfig));
        }
    }
    else {
        console.log("'" + command + "'", content.cmdNotFound);
        let relatedCommands = getRelatedCommands(command);        
        if(relatedCommands) {
            console.log(content.relatedCmds);
            showHelpForCommands(relatedCommands)
        }
        console.log(content.errFooter);
    }
} else {
    if (options.version) {
        console.log(pkg.version);
    } else {
        showHelpGlobal();
    }
}
