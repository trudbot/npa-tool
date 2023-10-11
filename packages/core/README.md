## NPM / YARN

npm和yarn的算法是一致的， 即扁平化。
当`a`包依赖一个`b`包时, 会从顶层node_modules开始， 一直到`a`包的node_modules目录， 找到第一个不存在冲突的目录， 安装在此。

但yarn有一个区别是， yarn 会在用户本地缓存已下载过的依赖包，优先会从缓存中读取依赖包，只有本地缓存不存在的情况才会采取远端请求的方式。


## PNPM
pnpm的依赖关系是显式的文件软链接， 这可以直接读取得到。

pnpm中所有第三方依赖包都保存到了`node_modules/.pnpm`中， 每个目录直接对应一个依赖包。
依赖包的目录结构非常固定， 这给我们带来了方便， 格式为`.pnpm/packageKey/node_modules`
其中`node_modules`里面分为两种。
一种是该包的数据。
一种是该包依赖的其它包的文件链接。

---
pnpm的monorepo原理与npm/yarn非常不同。
npm/yarn的原理是将用文件链接， 将子包链接到根目录的`node_modules`中， 所以就跟普通安装的依赖包使用无异， 幽灵依赖的缺陷都继承了。

而pnpm
