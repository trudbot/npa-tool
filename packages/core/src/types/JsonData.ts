
// 将依赖关系保存为json时， 数据的结构
// 借鉴了package.lock.json
export interface JsonData {
    [path: string]: {
        name: string,
        version: string,
        dependencies: string []
    }
}
