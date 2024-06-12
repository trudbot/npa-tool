# 快速开始
## 拉取代码到本地
```shell
$ git clone git@github.com:trudbot/npa-tool.git
$ cd npa-tool
```
## 安装依赖
> **`npa-tool`** 使用pnpm实现monorepo管理, 请确保你安装了pnpm并且版本在8以上。

```shell
$ pnpm install
```

## 构建流程
以下的流程可以通过运行预先写好的脚本: `sh scripts/build.sh`完成。
### 构建UI
`packages/ui`中是 **`npa-tool`** 的前端页面， 要启动`npa-tool`， 必须将ui打包构建并将产物复制到`packages/cli`下的ui目录中。
```shell
$ pnpm build:ui
$ cp -r packages/ui/dist packages/cli/ui
```
### 构建Core
`packages/core`是 **`npa-tool`** 的核心所在， 它负责识别不同的包管理器以制定不同的读取策略和依赖重建算法。
```shell
$ pnpm build:core
```

### 构建Cli
`packages/cli`是 **`npa-tool`** 的命令行入口， 它负责解析命令行参数->调用`core`获得数据->启动服务器展示`ui`。

* 当想测试工具整体效果/publish时， 使用发布构建
* 当想为ui开发提供数据支持时， 使用开发构建

::: code-group
```shell [开发构建]
$ pnpm build:cli
```
```shell [发布构建]
$ pnpm build:cli
```
:::
## 预览
当`core`、`ui`、`cli`都构建好时, 使用`pnpm start`即可预览效果。

`pnpm start pth`等同于`npa-cli analyze pth`。
## 开发
### 开发UI
1. 完成core的构建
```shell
$ pnpm build:core
```
2. 完成cli的开发模式构建
```shell
$ pnpm dev:cli
```
3. 启动cli数据服务器
```shell
$ pnpm start pth # pth为用于分析的项目路径
```
这将在3000端口启动一个数据服务器, 但不会打开前端页面。
3. 启动ui的开发模式
```shell
$ pnpm dev:ui
```
UI是一个`vite + vue`的前端项目, 当为开发模式时， 网络请求将发送到`"http://localhost:3000"`， 即cli服务器默认启动的端口， 可在`.dev.development`中配置。
### 开发Core
cli直接引用core， 所以在core中的任何修改(build:core后）都可以直接通过`pnpm start pth`执行, 无需再构建cli和ui。
### 开发Cli
`core`和`ui`构建完成后， 修改cli->`pnpm build:cli`->`pnpm start pth` 即可。
## 发布

### 发布core
```shell
$ cd packages/core
$ pnpm build
$ pnpm compress
$ pnpm login
$ pnpm publish
```

### 发布cli
::: warning
cli的发布必须由pnpm完成, 因为cli对core的依赖是通过pnpm workspace声明的。
:::
```shell
...如上完整的构建流程
$ cd packages/cli
$ pnpm compress
$ pnpm login
$ pnpm publish
```
