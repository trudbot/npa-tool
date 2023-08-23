import {Command} from "commander";
import {error, success, warning} from "./untils/Message";
import {createMyServer} from "./server";
import {PackageAnalyzer} from './packageAnalyzer'
import {Config} from "./types/Config";
import {parseConfig} from "./untils/configParser";
import {readPackageJson} from "./untils/readPackageJson";
import {saveJsonData} from "./untils/saveJsonData";
import {measureExecutionTime} from "./untils/measureExecutionTime";
import {PackageJson} from "./types/PackageJson";

function execute(config: Config) {
    let packages!: { [packagePath: string]: PackageJson};
    let analyzer!: PackageAnalyzer;
    if (config.depthLimit === -1) {
        warning("最大递归深度未设置， 将生成项目的所有的包依赖关系")
    }
    measureExecutionTime(() => {
        packages = readPackageJson(config.root)
    }, time => success(`读取package.json完成, 共用时${time} ms`));

    measureExecutionTime(() => {
        analyzer = new PackageAnalyzer(packages, config.depthLimit);
        analyzer.buildDependencyGraph();
    }, time => success(`建立依赖图完成, 共用时${time} ms`));

    if (config.saveJson) {
        measureExecutionTime(() => {
            saveJsonData(config.jsonPath, analyzer.dependencyGraph.exportToJson());
        }, time => success(`成功将依赖关系保存到${config.jsonPath}中`));
    } else {
        createMyServer(analyzer);
    }
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
