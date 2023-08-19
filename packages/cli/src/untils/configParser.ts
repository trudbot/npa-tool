import {Config} from "../classes/Config";
import {validateDepthOption, validateJsonOption, validateRootPath} from "./paramValidator";
import path from "path";
import {warning} from "./Message";

// 将用户输入的参数和选项解析为具体的参数对象
//
function parseConfig(root: string, options: { json: string, depth: string }): Config {
    const config: Config = {
        root: '',
        saveJson: false,
        jsonPath: '',
        depthLimit: -1
    };

    if (root) {
        validateRootPath(root);
        config.root = path.resolve(root);
    } else {
        config.root = path.resolve('./');
    }

    if (options.depth) {
        validateDepthOption(options.depth);
        config.depthLimit = Number.parseInt(options.depth);
    }

    if (options.json) {
        validateJsonOption(options.json);
        if (path.isAbsolute(options.json)) {
            config.jsonPath = options.json;
        } else {
            config.jsonPath = path.join(path.resolve('./'), options.json);
        }
        config.saveJson = true;
    }

    return config;
}


export {parseConfig}
