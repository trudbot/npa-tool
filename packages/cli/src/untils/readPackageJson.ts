import {globSync} from "glob";
import {PackageJson} from "../classes/PackageJson";
import path from "path";
import fs from "fs";

export function readPackageJson(root: string) {
    let packagePathList: string[];
    try {
        // 如果项目中存在package-lock.json时， 可以直接由其得到所有包的信息(
        fs.accessSync(path.join(root, 'package-lock.json'), fs.constants.F_OK);
        packagePathList = Object.getOwnPropertyNames(require(path.join(root, 'package-lock.json')).packages);

    } catch (err) {
        // 不存在package-lock.json时， 遍历读取node_modules
        packagePathList = globSync(
            [
                '**/node_modules/*/package.json',
                '**/node_modules/@*/*/package.json'
            ],
            {
                cwd: root
            }).map(e => path.dirname(e.replace(/\\/g, "\/")));
    }
    const packages: {
        [packagePath: string]: PackageJson
    } = {};
    const project = require(path.join(root, 'package.json'));
    packages[project.name] = project;
    for (let packagePath of packagePathList) {
        packages[packagePath] = require(path.join(root, packagePath, 'package.json'));
    }
    return packages;
}

