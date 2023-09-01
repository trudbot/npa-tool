const {validateRootPath} = require("../lib/untils/paramValidator.js")

test("不存在的root目录", () => {
    test(validateRootPath("D:\\a\\b\\c")).toThrow();
})
