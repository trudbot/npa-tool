import {Config} from "./types/Config.js";
import {AnalyzerFactory, PackageAnalyzer} from "./packageAnalyzer/index.js";
import {error, success, warning} from "./untils/Message.js";
import {measureExecutionTime} from "./untils/measureExecutionTime.js";
import {saveJsonData} from "./untils/saveJsonData.js";
import {createDataServer} from "./server/index.js";
import {Command} from "commander";
import {parseConfig} from "./untils/configParser.js";
import path from "path";
import {getDirname} from "./untils/getDirname";


function execute(config: Config) {
    let analyzer!: PackageAnalyzer;
    if (config.depthLimit === -1) {
        warning("The maximum recursion depth is not set, and all package dependencies of the project will be generated")
    }

    measureExecutionTime(() => {
        analyzer = AnalyzerFactory(config.root, config.depthLimit);
    }, time => success(`Completed reading the project package data, taking ${time} ms`));

    if (config.saveJson) {
        measureExecutionTime(() => {
            saveJsonData(config.jsonPath, analyzer.dependencyGraph.exportToJson());
        }, () => success(`Successfully saved dependency relationships to${config.jsonPath}`));
    } else {
        createDataServer(analyzer, path.join(getDirname(import.meta.url), '../ui'));
    }
}

function createProgram(): Command {
    const program = new Command();

    program
        .name("npa-cli")
        .description('Visualize nodes_ Modules dependency structure')
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
