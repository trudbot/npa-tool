import request from "../utils/request";

// 获得从项目根开始的、所有的包的依赖关系
export function getDependencyData() {
    return request({
        url: "/data",
        method: "get"
    });
}

// 获得某个包开始的依赖数据， depth为限制的深度
export function getPackageDependencies(query: {id: number, depth: number}) {
    return request({
        url: "/dependencies",
        method: "get",
        params: query
    });
}

// 获得某个包的package.json信息
export function getPackageJson(query: {id: number}) {
    return request({
        url: "/packageJson",
        method: "get",
        params: query
    })
}
