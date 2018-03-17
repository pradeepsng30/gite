#!/usr/bin/env node
'use strict';
/**
 * Require dependencies
 *
 */
const program = require('commander'),
    chalk = require("chalk"),
    exec = require('./executer'),
    pkg = require('./package.json'),
    output = require('./output.js');

/**
 * list function definition
 *
 */
let list = (directory,options)  => {
    const cmd = 'ls';
    let params = [];
    
    if (options.all) params.push("a");
    if (options.long) params.push("l");
    let parameterizedCommand = params.length 
                                ? cmd + ' -' + params.join('') 
                                : cmd ;
    if (directory) parameterizedCommand += ' ' + directory ;
    
    let output = (error, stdout, stderr) => {
        if (error) console.log(chalk.red.bold.underline("exec error:") + error);
        if (stdout) console.log(chalk.green.bold.underline("Result:\n") + stdout);
        if (stderr) console.log(chalk.red("Error: ") + stderr);
    };
    
    exec('git status',output);
    
};

let yo = (options) =>{
    let output = (error, stdout, stderr) => {
        if (error) console.log(chalk.red.bold.underline("exec error:") + error);
        if (stdout) console.log(chalk.green.bold.underline("Result:\n") + stdout);
        if (stderr) console.log(chalk.red("Error: ") + stderr);
    };
    exec('git status',output);
};


let gitExec = (cmds) => {
    console.log(output);
    exec('git ' + cmds ,output);
}


let deff = function (a,b) {
    console.log('a',a);
    console.log('b',b);
}

// program
//     .version(pkg.version)
//     .command('list [directory]')
//     .option('-a, --all', 'List all')
//     .option('-l, --long','Long list format')
//     .action(list);

// program
//     .version(pkg.version)
//     .command('g ')
//     .option('-a, --all', 'List all')
//     .option('-l, --long','Long list format')
//     .action(yo);


    program
    .command('exec [cmd=9]')
    .description('run the given remote command')
    .action(function(cmd) {
      console.log('exec "%s"', cmd);
    });

    program
    .command('ju [cmd]')
    .description('deploy the given env');


    program
    .option('-ui','ui specific');

    program
    .action(gitExec);

    
    program
    .version(pkg.version)
    .option('-p, --peppers', 'Add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbq-sauce', 'Add bbq sauce')
    .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')

    program
    .command('*')
    .action();

const cmdList = require('./config').commandList;

const addCommands = (cmdList, program) => {
    cmdList.forEach(function(element,i) {

        //console.log(i);
        //console.log(element.cmd, element.desc);
        program
        .command(element.cmd)
        .description(element.desc)
        //.option('-k','kk kkl')
        .action(function(){ return deff(element,arguments); });
    }, this);
}

addCommands(cmdList,program)
program.parse(process.argv);




// if program was called with no arguments, show help.
if (program.args.length === 0) program.help();