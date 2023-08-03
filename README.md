# NPM Package Analysis Tool [![](https://img.shields.io/badge/npm-v1.0.0-red.svg)](https://www.npmjs.com/package/npa-tool) [![](https://img.shields.io/badge/github-npa_tool-greene.svg)](https://github.com/trudbot/npa-tool)
## About The Project

[//]: # ([![Product Name Screen Shot][product-screenshot]]&#40;https://example.com&#41;)
项目变大，依赖变多之后，npm的包依赖关系会变得非常非常复杂，常常让我们看不清：
- 为什么会安装某个特定 package；
- 为什么某些 package 会安装多个版本；
- 子 package 之间形成了怎样的父子依赖关系；
- 是否存在循环依赖；
- 等等。

**npa-tool**是一个开源的命令行界面交互工具， 能从项目的package.json出发， 得到项目的所有包依赖关系， 并可视化展现。

## Installation
```shell
npm install -g npa-tool --production
```

## Usage

```
$ npa-cli analyze -h              
                
Usage: npa-cli analyze [options] [root-path]

分析指定目录的包依赖关系

Arguments:
  root-path           解析的项目根目录

Options:
  --depth <depth>     向下递归分析的层次深度
  --json <json-path>  将依赖关系以json形式存储到指定的文件
  -h, --help          display help for command
```
示例
```shell
npa-cli analyze --json="./result.json" --depth=5
npa-cli analyze --json="./result.json" ./project
```
