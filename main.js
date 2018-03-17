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


let gitExec = (cmd) => {
    console.log(output);
    exec('git ' + cmd ,output);
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


//     program
//     .command('exec <cmd>')
//     .description('run the given remote command')
//     .action(function(cmd) {
//       console.log('exec "%s"', cmd);
//     });

    program
    .version(pkg.version)
    .command('* [cmds]')
    .description('deploy the given env')
    .action(gitExec);
 
program.parse(process.argv);

// if program was called with no arguments, show help.
if (program.args.length === 0) program.help();