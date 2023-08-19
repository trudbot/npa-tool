import {Command} from "commander";
import chalk from "chalk";

function error(program: Command, msg: string) {
    program.error(chalk.red("ERROR   ") + msg);
}

function warning(msg: string) {
    console.log(chalk.yellow("WARNING   ") + msg);
}

function success(msg: string) {
    console.log(chalk.green("INFO   ") + msg);
}


export {error, warning, success}
