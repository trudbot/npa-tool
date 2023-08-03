import {Command} from "commander";
import chalk from "chalk";

function error(program: Command, msg: string) {
    program.error(chalk.red("ERROR   ") + msg);
}

function warning(program: Command, msg: string) {
    console.log(chalk.yellow("WARNING   ") + msg);
}


export {error, warning}
