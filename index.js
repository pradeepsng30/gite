#!/usr/bin/env node
'use strict';
const input_args = require('yargs').argv;

const args = input_args._;
const options = input_args;
const command = args[0];

const content = require('./content');
const config = require('./config');
const commandList = config.commandList;
const pkg = require('./package.json');
const help = require('./help');
const execute = require('./executer');

let getRelatedCommands = (command) => {
    return commandList.filter(element => {
        return element.cmd.split(' ')[0].indexOf(command) !== -1 && (command.length >=4);
    });
};

let getCommandConfig = function (command) {
    return commandList.filter(element =>{
        return element.cmd === command;
    })[0];
};

let validateAndParse = function (element) {
    let result = {};
    if (element.args) {
        element.args.split(' ').forEach( (arg,i) => {
            let argName ;
            if(arg.length < 3) {
                throw Error('invalid arg list in config');
            }
            argName = arg.slice(1,-1);
            if(arg[0] === '<' && arg[arg.length-1] === '>') {
                if(i+1 >= args.length) {
                    throw Error(`missing required argument: ${argName}`);
                }
                result[argName] = args[i+1];
            } else if(arg[0] === '[' && arg[arg.length-1] === ']') {
                if(i+1 < args.length) {
                    result[argName] = args[i+1];
                }
            }
            else {
                throw Error('invalid arg list in config');
            }
        });
    }
    return result;
};


let injectValues = function (str, values) {
    let pattern = /{{.*?}}/g ;
    let pattern2 = /\$.*\$/g;
    let textsToreplace = str.match(pattern);
    textsToreplace && textsToreplace.forEach(textToreplace => {
        let varString = textToreplace.match(pattern2)[0];
        let varName = varString.slice(1,-1);
        let varVal = values[varName];
        if(varVal && varVal.indexOf(' ') > -1) {
            varVal = '\'' + varVal + '\''; 
        }
        let replacement = (varVal === undefined) ? '' : textToreplace.slice(2,-2).replace(varString, varVal.toString());
        str = str.replace(textToreplace, replacement);
    });
    return str.replace(/\s+/g,' ').trim();
};

let getNewCmds = function (element, argObj) {
    return element.execCommands.map(cmdObj => {
        let cmd = cmdObj.newcmd + ' ' + cmdObj.args;
        return injectValues(cmd, argObj);
    });
};

let showCmds = function (cmds) {
    console.log(content.showCmdsHeader);
    cmds.forEach(cmd => {
        console.log('\t' + cmd);
    });
};

let main  = function () {
    if (options.version || options.v) {
        console.log(pkg.version);
    } else {
        if (command){
            let commandConfig = getCommandConfig(command);
            if (commandConfig){
                if (options.h){ 
                    help.showHelpForCommand(commandConfig, true);
                } else {
                    let cmdsToExec = getNewCmds(commandConfig, validateAndParse(commandConfig));
                    if(options.s || options.show){
                        showCmds(cmdsToExec);
                    } else {
                        execute(cmdsToExec);            
                    }
                }
            }
            else {
                console.log('\'' + command + '\'', content.cmdNotFound);
                let relatedCommands = getRelatedCommands(command);        
                if(relatedCommands && relatedCommands.length > 0) {
                    console.log(content.relatedCmds);
                    help.showHelpForCommands(relatedCommands);
                }
                console.log(content.errFooter);
            }
        } else {
            help.showHelpGlobal(config);
        }
    }
};


try {
    main();
} catch (e) {
    console.log('\x1b[31m%s\x1b[0m', 'Error occured');
    console.log(e.toString());
    console.log(content.errFooter);
}
