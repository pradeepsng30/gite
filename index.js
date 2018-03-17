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

let getCommandConfig = (command) => {
    return commandList.filter(element =>{
        return element.cmd.split(' ')[0] === command;
    })[0];
}


console.log(args, options, command);

console.log(getRelatedCommands(command));
console.log(getCommandConfig(command));