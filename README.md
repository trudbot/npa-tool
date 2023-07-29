## About The Project

[//]: # ([![Product Name Screen Shot][product-screenshot]]&#40;https://example.com&#41;)
项目变大，依赖变多之后，npm的包依赖关系会变得非常非常复杂，常常让我们看不清：
- 为什么会安装某个特定 package；
- 为什么某些 package 会安装多个版本；
- 子 package 之间形成了怎样的父子依赖关系；
- 是否存在循环依赖；
- 等等。

因此产生了这个CLI工具， 能从项目的package.json出发， 得到项目的所有包依赖关系， 并可视化展现。

## Installation
```shell
npm install -g npa-tool
```

## Quick Start

```
基本命令： npa-cli analyze
参数: 
  root-path: 可选， 指定项目目录， 默认为当前目录
 选项:
  --help: 帮助信息
  --depth: 限制递归分析的深度
  --json: 不再打开网页， 而是将依赖关系保存到指定的json文件
```
示例
```shell
npa-cli analyze --json="./result.json" --depth=5
npa-cli analyze --json="./result.json" ./project
```
