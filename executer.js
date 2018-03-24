'use strict';
const cp = require('child_process');

//module.exports = (cmds) => {
let exec = function(cmds) { 
    try {
        cmds.forEach(cmd =>{
            console.log(cp.execSync(cmd).toString());
        });
    } catch (e) {
        console.log('\x1b[31m%s\x1b[0m', 'Error occured');
        console.log(e.toString());
    }
};
module.exports = exec;
