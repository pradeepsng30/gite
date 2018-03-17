const child = require('child_process')

module.exports = (cmd,output) => {
    child.exec(cmd, output);
}
