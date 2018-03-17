const     chalk = require("chalk");
module.exports = (error, stdout, stderr) => {
    if (error) console.log(chalk.red.bold.underline("exec error: ") + error);
    if (stdout) console.log(chalk.green.bold.underline("Result:\n") + stdout);
    if (stderr) console.log(chalk.red("Error: ") + stderr);
};

//module.exports = output(); 
