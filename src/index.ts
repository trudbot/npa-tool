import path from "path";
import {program} from "commander";
import fs from 'fs'
import {error, warning} from "./untils/Message";

async function bootstrap(root: string, options: { json: string, depth: string }) {
    const config: Config = {
        root: '',
        saveJson: false,
        jsonPath: '',
        depthLimit: 1000000
    };

    if (!root) {
        config.root = path.resolve('./');
    } else {
        await fs.access(path.join(root, 'package.json'), fs.constants.F_OK, (err) => {
            if (err) {
                error(program, `指定的目录${path.resolve(root)}中不存在package.json文件`);
            }
        });
        config.root = path.resolve(root);
    }

    //depth字段检验
    if (!options.depth || options.depth.length === 0) {
        warning(program, "递归深度为空, 不作深度限制");
    } else if (!/^[1-9]+[0-9]*]*$/.test(options.depth)) {
        error(program, "递归深度必须为正整数");
    } else {
        config.depthLimit = Number.parseInt(options.depth);
    }

    //json-path字段检验
    if (options.json) {
        await fs.writeFile(options.json, '', (err) => {
            if (err && err.errno === -4058) {
                error(program, "json文件路径格式错误或不存在");
            }
        });
        config.saveJson = true;
        config.jsonPath = options.json;
    }


    console.log(config);
}

function main() {
    program
        .name("npa-cli")
        .description('用于分析node_modules包依赖关系的cli工具')
        .version('1.0.0')

    program
        .command('analyze')
        .description('分析指定目录的包依赖关系')
        .argument('[root-path]', "解析的项目根目录")
        .option('--depth <depth>', "向下递归分析的层次深度")
        .option('--json <json-path>', "将依赖关系以json形式存储到指定的文件")
        .action(bootstrap)

    program.parse(process.argv);
}

export {main};
