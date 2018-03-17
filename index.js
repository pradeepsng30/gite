#!/usr/bin/env node
'use strict';
const input_args = require('yargs').argv;

const args = input_args._
const options = input_args;
const command = args[0];

const content = require('./content');
const commandList = require('./config').commandList;
const pkg = require('./package.json');
const help = require('./help');

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
            help.showHelpForCommand(commandConfig, true);
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
            help.showHelpForCommands(relatedCommands)
        }
        console.log(content.errFooter);
    }
} else {
    if (options.version) {
        console.log(pkg.version);
    } else {
        help.showHelpGlobal(commandList);
    }
}
