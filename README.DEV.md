# 开发npa-tool
npa-tool使用pnpm- Monorepo管理代码
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
pnpm build:cli
pnpm build:core
pnpm run build:ui
copy the files under packages/ui/dist to packages/cli/ui
pnpm dev:cli <path>
```
**调试前端**

* 打开packages/cli/src/server/index 下的跨域, 重新编译运行
* 打开新命令行运行 `pnpm dev:ui`


