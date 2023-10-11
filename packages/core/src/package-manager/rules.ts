import {PackageManager} from "../enums/PackageManager";
import {isFileExistsInDirectory} from "../utils/fsUtils";

export abstract class PackageManagerDetector {
    abstract detect(root: string): null | PackageManager;
}

class NpmDetector extends PackageManagerDetector{
    detect(root: string): PackageManager | null {
        return isFileExistsInDirectory(root, 'package-lock.json') ? PackageManager.npm : null;
    }
}

class YarnDetector extends PackageManagerDetector {
    detect(root: string): PackageManager | null {
        return isFileExistsInDirectory(root, 'yarn.lock') ? PackageManager.yarn : null;
    }
}

class PnpmDetector extends PackageManagerDetector {
    detect(root: string): PackageManager | null {
        return isFileExistsInDirectory(root, 'pnpm-lock.yaml') ? PackageManager.pnpm : null;
    }
}
export {NpmDetector, PnpmDetector, YarnDetector}

