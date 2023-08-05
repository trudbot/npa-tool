# 开发npa-tool
npa-tool使用Monorepo管理代码, 基于npm的workspaces, 所以需要保证你的npm版本在7及以上。

* 基本代码结构
```
@npa-tool/root
|-- node_modules    # 所有模块共用一个node_modules
|-- packages/     # 项目的所有模块
|   |-- cli(npa-tool)   # 命令行以及后端代码
|       |-- bin/     # 可执行文件
|       |-- dist/    # ts编译后的代码
|       |-- html/    # 前端build好的网页源码
|       |-- src/     # ts源码
|           |-- classes/   # 类和接口
|           |-- server/    # 服务器
|           |-- index.ts
|       |-- package.json
|   |-- ui(npa-ui)     # 前端代码
|-- package.json
```

* 安装依赖
```shell
npm install
````
* 为单独一个子包安装新依赖
  如，
```shell
npm install -w npa-ui vue
```

在根目录执行即可， 用`-w`选项指出子模块的包名(package.json中的name)

> 在基于npm workspaces的Monorepo项目中， 如果想在子包中执行npm命令， 只需要在根目录直接执行， 并且加上-w指定子包名。
> 
> 例如要在npa-ui执行`npm run dev`进行调试， 
> 
> 只需要在根目录执行`npm run -w npa-ui dev`
> 
> 更多信息可见[官方文档](https://docs.npmjs.com/cli/v9/using-npm/workspaces)

* 默认脚本
可见[package.json #scripts](./package.json)
```shell
npm run build:cli # 编译cli中的typescript代码
npm run dev       # 前端调试
npm run build:ui  # 前端打包
```
* 使用命令行
> 前置条件： cli代码已经编译， 前端代码已打包并复制到cli/html下

```shell
npx npa-cli analyze
```
