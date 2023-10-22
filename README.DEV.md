# 开发npa-tool
npa-tool使用pnpm- Monorepo管理代码, 你需要满足`node >= 16`, `pnpm >= 8`

## How to Run
```shell
git clone git@github.com:trudbot/npa-tool.git
cd npa-tool
sh scripts/build.sh # any way to run this shell script.
```
## 调试前端
```shell
pnpm dev:cli
pnpm start <dir>
pnpm dev:ui
```

## 打包发布

**cli**

```shell
sh scripts/publish-build-cli.sh
cd packages/cli
pnpm publish
```

**core**

```shell
sh scripts/publish-build-core.sh
cd packages/core
pnpm publish
```
