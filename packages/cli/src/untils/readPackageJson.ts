import {globSync} from "glob";
import {PackageJson} from "../types/PackageJson";
import path from "path";
import fs from "fs";

// 读取项目的package.json
export function readPackageJson(root: string) {
    let packagePathList: string[];
    // try {
    //     // 如果项目中存在package-lock.json时， 可以直接由其得到所有包的信息(
    //     fs.accessSync(path.join(root, 'package-lock.json'), fs.constants.F_OK);
    //     packagePathList = Object.getOwnPropertyNames(require(path.join(root, 'package-lock.json')).packages);
    // } catch (err) {
        // 不存在package-lock.json时， 遍历读取node_modules
        packagePathList = globSync(
            // 匹配包的关键规则
            // 在当前的npm规则下, 没有问题
            // 2023.8
            [
                '**/node_modules/*/package.json',
                '**/node_modules/@*/*/package.json'
            ],
            {
                cwd: root
            }).map(e => path.dirname(e.replace(/\\/g, "\/")));
    // }
    const packages: {
        [packagePath: string]: PackageJson
    } = {};
    packages[''] = require(path.join(root, 'package.json'));
    packages[''].dev = true;

    for (let packagePath of packagePathList) {
        if (packagePath.length !== 0 && packagePath.startsWith("node_modules")) {
            try {
                const packageJson: PackageJson = require(path.join(root, packagePath, 'package.json'));
                packages[packagePath] = packageJson;
            } catch (e) {
                console.log(packagePath);
                throw new Error("读取package.json时发生错误");
            }
            // packages[packagePath] = require(path.join(root, packagePath, 'package.json'));
        }
    }

    // Monorepo(npm workspaces)解析
    // monorepo的子项目也都是处于开发环境
    if (packages[''].workspaces !== undefined) {
        for (let pattern of packages[''].workspaces) {
            for (let pth of globSync(pattern, {cwd: root})) {
                const packageJson: PackageJson = require(path.join(root, pth, 'package.json'));
                if (packages[''].dependencies === undefined) {
                    packages[''].dependencies = {};
                }
                packages[''].dependencies[packageJson.name] = packageJson.version;
                packages[path.posix.join("node_modules", packageJson.name)].dev = true;
            }
        }
    }
    return packages;
}

