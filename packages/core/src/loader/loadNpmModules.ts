import {PackageJson, PackagesSet, ROOT} from "../types/PackageJson";
import {nativePathJoin, posixDirname} from "../utils/PathUitls";
import {npmModulesGlobRules} from "../glob-rules/common";
import {posixGlobSync} from "../utils/PosixGlobSync";
import {globSync} from "glob";
import {addDependency} from "../utils/packageJsonUtils";
import {DependencyType} from "../enums/DependencyType";
import {readJsonFile} from "../utils/fsUtils";

export function loadNpmModules(
    root: string
): PackagesSet<PackageJson> {
    const packages: PackagesSet<PackageJson> = {};
    try {
        packages[ROOT] = readJsonFile<PackageJson>(nativePathJoin(root, 'package.json'));
        const monorepo: string[] | undefined = packages[ROOT].workspaces;
        if (monorepo !== undefined) {
            const monorepoPath = globSync(monorepo, {
                cwd: root
            });
            monorepoPath.forEach(repo => {
                const packageJson: PackageJson = readJsonFile<PackageJson>(nativePathJoin(root, repo, 'package.json'));
                packageJson.dev = true;
                addDependency(packages[ROOT], packageJson.name, packageJson.version, DependencyType.Dependencies);
            })
        }
    } catch (e) {
        console.log(`Error loading user package<npm/yarn>`)
        throw e;
    }

    // console.log(packagePathList.length, packagePathList)

    try {
        const packagePathList = posixGlobSync(npmModulesGlobRules, {
            cwd: root,
        });
        packagePathList.forEach(pth => {
            packages[posixDirname(pth)] = readJsonFile<PackageJson>(nativePathJoin(root, pth));
        })
    } catch (e) {
        console.log(`Error loading dependency package<npm/yarn>`);
        throw e;
    }

    return packages;
}
