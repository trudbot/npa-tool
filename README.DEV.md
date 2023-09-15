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
|       |-- src/
|           |-- api       # api封装
|           |-- router    # 路由
|           |-- stores    # 全局状态
|           |-- views     # 界面代码
|           |-- assets    # 静态资源(色系、图标)
|       |-- .env.development        # 开发环境下的环境变量
|       |-- .env.production         # 生产环境下的环境变量
|       |-- package.json
|-- package.json
```

## How to Run
```shell
git clone git@github.com:trudbot/npa-tool.git
cd npa-tool
npm install
npm run build:cli
npm run build:ui
copy the files under packages/ui/dist to packages/cli/ui
npx npa-cli analyze <path>
```
**调试前端**

* 打开packages/cli/src/server/index 下的跨域, 重新编译运行
* 打开新命令行运行 `npm run dev`

## More

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

