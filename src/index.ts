export function main() {

    const {program} = require("commander")
    program
        .name("npa-cli")
        .description('用于分析node_modules包依赖关系的cli工具')
        .version('1.0.0')

    program
        .command('analyze')
        .description('从当前目录开始分析包依赖关系')
        .option('--depth <depth>', "指定向下递归分析的层次深度")
        .option('--json <json-path>', "将依赖关系以json形式存储到指定文件")
        .action((options: any) => {
            console.log(options);
        })

    program.parse(process.argv);
}
