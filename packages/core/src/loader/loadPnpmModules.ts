import {PackageJson, PackagesSet, ROOT} from "../types/PackageJson";
import {nativeDirname, nativePathJoin, posixRelative, toPosixRelativePath} from "../utils/PathUitls";
import {pnpmDependenciesSource, pnpmPackageDependencies, pnpmPackageDependenciesBase} from "../glob-rules/pnpm";
import {isSymbolicLink, readPosixSymbolLinkRelativeValue} from "../utils/SymbolicLinkUtils";
import {globSync} from "glob";
import YAML from 'yaml';
import fs from "fs";
import {addDependency} from "../utils/packageJsonUtils";
import {DependencyType} from "../enums/DependencyType";
import {readJsonFile} from "../utils/fsUtils";

export type PnpmDependency = {
    pkgName: string;
    pth: string;
}


export type PnpmPackageSourceData = {
    packageJson: PackageJson;
    allDependencies: PnpmDependency[];
};

export function loadPnpmModules(
    root: string
): PackagesSet<PnpmPackageSourceData> {
    const packages: PackagesSet<PnpmPackageSourceData> = {};

    try {
        const projectModule = [ROOT];
        const monorepo = YAML.parse(fs.readFileSync(nativePathJoin(root, 'pnpm-workspace.yaml'), 'utf-8')).packages;
        const monorepoPath = globSync(monorepo, {
            cwd: root
        });
        projectModule.push(...monorepoPath);

        // 由用户定义的包， 所有依赖直接以文件链接的形式放在node_modules中
        projectModule.forEach(project => {
            const projectAbsolutePath = nativePathJoin(root, project);
            packages[toPosixRelativePath(project)] = {
                packageJson: readJsonFile<PackageJson>(nativePathJoin(projectAbsolutePath, 'package.json')),
                allDependencies: globSync(pnpmPackageDependencies, {
                    cwd: projectAbsolutePath
                }).map(depend => {
                    return {
                        pth: readPosixSymbolLinkRelativeValue(nativePathJoin(projectAbsolutePath, depend), root),
                        pkgName: posixRelative(pnpmPackageDependenciesBase, toPosixRelativePath(depend))
                    }
                })
            }
        })

        // 将monorepo中定义的包全部加进主包的依赖
        packages[ROOT].allDependencies.push(...monorepoPath.map(pkg => {
            return {
                pth: toPosixRelativePath(pkg),
                pkgName: packages[toPosixRelativePath(pkg)].packageJson.name
            }
        }));
        monorepoPath.forEach(pkg => {
            const pth = toPosixRelativePath(pkg);
            addDependency(
                packages[ROOT].packageJson,
                packages[pth].packageJson.name,
                packages[pth].packageJson.version,
                DependencyType.Dependencies
            )
        })
    } catch (e) {
        console.log("Error loading user package<pnpm>")
        throw e;
    }

    try {

        // 读取.pnpm下所有的包
        const modulesDir = globSync(pnpmDependenciesSource, {
            cwd: root
        }).map(nativeDirname);

        // 遍历这些包
        modulesDir.forEach(dir => {
            const dirAbsolutePath = nativePathJoin(root, dir);

            // 匹配包目录中的node_modules中的子包
            const modules = globSync(pnpmPackageDependencies, {
                cwd: dirAbsolutePath
            });

            let packageJsonOfModule: PackageJson | null = null;
            let pth: string | null = null;
            let cnt = 0;
            const dependencies: PnpmDependency[] = [];

            // 遍历包中出现的子包， 一个是源文件， 其它是文件链接
            modules.forEach(module => {
                const moduleAbsolutePath = nativePathJoin(dirAbsolutePath, module);
                if (isSymbolicLink(moduleAbsolutePath)) {
                    dependencies.push({
                        pth: readPosixSymbolLinkRelativeValue(moduleAbsolutePath, root),
                        pkgName: posixRelative(pnpmPackageDependenciesBase, toPosixRelativePath(module))
                    });
                } else {
                    cnt++;
                    pth = toPosixRelativePath(nativePathJoin(dir, module));
                    packageJsonOfModule = readJsonFile(nativePathJoin(moduleAbsolutePath, 'package.json'));
                }
            })
            if (packageJsonOfModule === null || pth === null || cnt !== 1) {
                throw new Error(`未读取到依赖包的安装目录, ${dir}, ${modules}`);
            } else {
                packages[pth] = {
                    packageJson: packageJsonOfModule,
                    allDependencies: dependencies
                }
            }
        })
    } catch (e) {
        console.log("Error loading dependency package<pnpm>");
        throw e;
    }

    return packages;
}
