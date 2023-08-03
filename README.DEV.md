### 拉取
将项目拉取到本地

### 基本项目结构
```
root
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

### 安装依赖
```shell
npm install
````
### build:cli
编译cli中的代码
```shell
npm run build:cli
```

### npx npa-tool analyze

执行cli中的命令， 由于是局部安装， 需要加`npx`
```shell
npx npa-tool analyze --depth=10
```

### 为子模块安装新依赖
如，
```shell
npm install -w npa-ui packageName
```

在根目录执行即可， 用`-w`选项指出子模块的包名(package.json中的name)
