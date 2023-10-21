import {PackageManager} from "../enums/PackageManager";
import {NpmDetector, PnpmDetector, YarnDetector} from "./rules";
import {DependencyResolver} from "../resolver/Resolver";
import {NpmResolver} from "../resolver/NpmResolver";
import {loadNpmModules} from "../loader/loadNpmModules";
import {PnpmResolver} from "../resolver/PnpmResolver";
import {loadPnpmModules} from "../loader/loadPnpmModules";

const detectors = [
    NpmDetector,
    YarnDetector,
    PnpmDetector
]

export class ResolverFactory {
    getDependencyGraph(root: string, depth: number): DependencyResolver<unknown> {
        let pkgManager: PackageManager | null = null;
        detectors.forEach(detector => {
            if (pkgManager === null) {
                pkgManager = new detector().detect(root);
            }
        });
        if (pkgManager === null) {
            console.log('warning', 'Package manager not matched to project');
            return new NpmResolver(loadNpmModules(root), depth);
            // throw new Error('Package manager not matched to project');
        }
        // console.log('manager', PackageManager[pkgManager]);
        switch (pkgManager) {
            case PackageManager.npm | PackageManager.yarn:
                return new NpmResolver(loadNpmModules(root), depth);
            case PackageManager.pnpm:
                return new PnpmResolver(loadPnpmModules(root), depth);
            default:
                return new NpmResolver(loadNpmModules(root), depth);
        }
    }
}
