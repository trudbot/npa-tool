import path from "path";
import {Command} from "commander";
import {error, warning} from "./untils/Message";
import {createMyServer} from "./server";
import {PackageAnalyzer} from './packageAnalyzer'
import {Config} from "./classes/Config";
import {parseConfig} from "./untils/configParser";
import {readPackageJson} from "./untils/readPackageJson";
import fs from "fs";

function execute(config: Config) {
    console.time("读取时间")
    const packages = readPackageJson(config.root)
    console.timeEnd("读取时间");
    console.log(Object.getOwnPropertyNames(packages).length)
    console.time("建图时间")
    const analyzer = new PackageAnalyzer(packages, config.depthLimit);
    const graph = analyzer.buildDependencyGraph();
    console.timeEnd("建图时间")
    fs.writeFile('./data.json', JSON.stringify(graph.export()), (err) => {
        console.log(err);
    })
    // const data=  graph.exportDependencies();
    // console.log(graph.availableIndex)
    // createMyServer(config);
}

function createProgram(): Command {
    const program = new Command();

    program
        .name("npa-cli")
        .description('用于分析node_modules包依赖关系的cli工具')
        .version('1.0.0');

    program
        .command('analyze')
        .description('分析指定目录的包依赖关系')
        .argument('[root-path]', "解析的项目根目录")
        .option('--depth <depth>', "向下递归分析的层次深度")
        .option('--json <json-path>', "将依赖关系以json形式存储到指定的文件")
        .action((root: string, options: { json: string, depth: string }) => {
            try {
                execute(parseConfig(root, options));
            } catch (err) {
                error(program, (err as Error).message);
            }
        });

    return program;
}

function main() {
    createProgram().parse(process.argv);
}

export {main};
