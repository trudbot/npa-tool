import {loadPnpmModules} from "../src/loader/loadPnpmModules";
import {PnpmResolver} from "../src";
function test() {
    const res = loadPnpmModules('D:\\test\\test_pnpm');
    // // console.log(res[ROOT])
    // console.log(res)
    const graph = new PnpmResolver(res, -1).resolveDependencies();
    console.log(graph.exportToJson());
}

test();
