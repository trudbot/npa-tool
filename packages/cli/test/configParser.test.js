const {parseConfig} = require("../lib/untils/configParser");

test("默认参数", () => {
    expect(parseConfig(undefined, {})).toStrictEqual({
        root: 'C:\\Users\\trudbot\\npa-tool\\packages\\cli',
        saveJson: false,
        jsonPath: '',
        depthLimit: -1
    })
})

test("正常参数", () => {
    expect(parseConfig("D:/test", {depth: 2})).toStrictEqual({
        root: 'D:\\test',
        saveJson: false,
        jsonPath: '',
        depthLimit: 2
    })
})


test("错误的depth参数类型", () => {
    expect(parseConfig(undefined, {depth: "abc"})).toThrow();
})

test("root目录不存在或不存在package.json", () => {
    expect(parseConfig("./a/c", {})).toThrow();
})
