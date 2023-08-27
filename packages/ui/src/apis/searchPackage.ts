import request from "../utils/request.ts";
import {AxiosResponse} from "axios";
import {PackageInfo} from "./types/PackageJson.ts";

export function searchPackage(query: {pattern: string}): Promise<AxiosResponse<{data: PackageInfo[]}>> {
    return request({
        url: "/api/searchPackage",
        method: "get",
        params: query
    })
}
