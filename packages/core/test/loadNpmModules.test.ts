import {loadNpmModules} from "../src/loader/loadNpmModules";
import {NpmResolver} from "../src";

function test() {
    const res = loadNpmModules('D:\\test\\test_yarn');
    console.log(res);
    const graph = new NpmResolver(res, -1);
    console.log(graph.resolveDependencies().exportToJson());
}

test();
