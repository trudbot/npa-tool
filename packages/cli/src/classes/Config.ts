// 配置对象的抽象
export interface Config {
    root: string,
    saveJson: boolean,
    jsonPath: string,
    depthLimit: number
}
