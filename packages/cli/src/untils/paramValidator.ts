import fs from "fs";
import path from "path";

// 验证用户输入的参数的合法性

// root path 规则: 此目录下必须有package.json文件
function validateRootPath(root: string) {
    try {
        fs.accessSync(path.join(root, 'package.json'), fs.constants.F_OK);
    } catch (err) {
        throw new Error(`指定的目录${path.resolve(root)}中不存在package.json文件`);
    }
}

// json path规则, 必须为合法的json文件路径
function validateJsonOption(jsonPath: string) {
    if (!jsonPath.endsWith('.json')) {
        throw new Error("请输入正确的json文件路径, 如./data.json");
    }
    try {
        fs.writeFileSync(jsonPath, '');
    } catch (err) {
        throw new Error("json文件路径格式错误或不存在");
    }
}

// depth规则: 必须为正整数, 不能有前导零
function validateDepthOption(depth: string) {
    if (!/^[1-9]+[0-9]*]*$/.test(depth)) {
        throw new Error("depth参数必须为正整数");
    }
}

export {validateDepthOption, validateJsonOption, validateRootPath}
