import request from "../utils/request";
import {AxiosResponse} from "axios";
import {GraphData} from "./types/GraphData.ts";
import {PackageData, PackageJson} from "./types/PackageJson.ts";
import {DirectDependencyList} from "./types/DirectDependencyList.ts";

// 获得从项目根开始的、所有的包的依赖关系
export function getDependencyData(): Promise<AxiosResponse<GraphData>> {
    return request({
        url: "/api/data",
        method: "get"
    });
}

// 获得某个包开始的依赖数据， depth为限制的深度
export function getPackageDependencies(query: {id: number, depth: number}): Promise<AxiosResponse<GraphData>> {
    return request({
        url: "/api/dependencies",
        method: "get",
        params: query
    });
}

// 获得某个包的路径和package.json
export function getPackageData(query: {id: number}): Promise<AxiosResponse<PackageData>> {
    return request({
        url: "/api/packageData",
        method: "get",
        params: query
    })
}

// 获取某个包的一级依赖列表
export function getPackageDirectDependencies(query: {id: number}): Promise<AxiosResponse<DirectDependencyList>> {
    return request({
        url: "api/directDependencyList",
        method: "get",
        params: query
    })
}

export function whyPackageInstalled(query: {id: number}): Promise<AxiosResponse<GraphData>> {
    return request({
        url: "api/whyInstalled",
        method: "get",
        params: query
    })
}
