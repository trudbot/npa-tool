import {ResolverFactory} from "../src/package-manager/factory";

const factoryTest = new ResolverFactory();
const resolver = factoryTest.getDependencyGraph('D:\\test\\test_npm', -1);
console.log(resolver.resolveDependencies().exportToJson());
