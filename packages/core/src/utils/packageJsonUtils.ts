// 遍历包的一种依赖
// 产生(包名, 版本)为参数的回调
import {DependenciesMap, PackageJson} from "../types/PackageJson";
import {DependencyType} from "../enums/DependencyType";

export function iterateDependenciesMap(dependencies: DependenciesMap | undefined, callback: (name: string, version: string) => void): void {
    if (dependencies === undefined) {
        return;
    }
    for (const packageName of Object.getOwnPropertyNames(dependencies)) {
        // 版本号有很多格式， 其中semver只能解析正常的版本号
        // 但还可能会有链接形式
        // 如npm:...., file:..., http://....
        // 详见(https://docs.npmjs.com/cli/v8/configuring-npm/package-json?v=true#dependencies)
        // 对于特殊格式, 实际的依赖可能需要解析才能得到, 如A: npm:B@^1.0.0， 存储的目录以及引用时看似是A包， 但其实真正安装使用的是B包
        // 是否需要去解析？ 目前的做法是， npm链接可以准确的得到包名和版本， 可以解析一下正确， 免得检查报错
        const version = dependencies[packageName];
        if (version.startsWith("npm:")) {
            const split = version.split('@');
            callback(packageName, split[1]);
        } else {
            callback(packageName, version);
        }
    }
}

// 增加一个指定类型的依赖项
export function addDependency(packageJson: PackageJson, pkgName: string, pkgVersion: string, type: DependencyType) {
    if (packageJson[type] === undefined) {
        packageJson[type] = {};
    }
    (packageJson[type] as DependenciesMap)[pkgName] = pkgVersion;
}

//
export function getDependencyMap(packageJson: PackageJson): Map<string, DependencyType> {
    const result = new Map<string, DependencyType>();
    if (packageJson[DependencyType.Dependencies] !== undefined) {
        Object.getOwnPropertyNames(packageJson[DependencyType.Dependencies])
            .forEach(e => result.set(e, DependencyType.Dependencies));
    }
    if (packageJson[DependencyType.DevDependencies] !== undefined) {
        Object.getOwnPropertyNames(packageJson[DependencyType.DevDependencies])
            .forEach(e => result.set(e, DependencyType.DevDependencies));
    }
    if (packageJson[DependencyType.OptionalDependencies] !== undefined) {
        Object.getOwnPropertyNames(packageJson[DependencyType.OptionalDependencies])
            .forEach(e => result.set(e, DependencyType.OptionalDependencies));
    }
    if (packageJson[DependencyType.PeerDependencies] !== undefined) {
        Object.getOwnPropertyNames(packageJson[DependencyType.PeerDependencies])
            .forEach(e => result.set(e, DependencyType.PeerDependencies));
    }
    return result;
}
