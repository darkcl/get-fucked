import { MODULE_IMPORTS_KEY, MODULE_KEY } from "~lib/modules";
import logTree from "console-log-tree";

const loadModuleTree = (module: NewableFunction) => {
  const isModule = Reflect.getMetadata(MODULE_KEY, module);
  if (!isModule) throw new Error(`${module.name} is not a module`);

  const tree = {
    name: module.name,
    children: [],
  };

  const importModules = Reflect.getMetadata(MODULE_IMPORTS_KEY, module);
  for (const importModule of importModules) {
    tree.children.push(loadModuleTree(importModule));
  }

  return tree;
};

export class Application {
  static load(module: NewableFunction) {
    const isModule = Reflect.getMetadata(MODULE_KEY, module);
    if (!isModule) throw new Error(`${module.name} is not a module`);

    const tree = [];

    logTree.log(loadModuleTree(module));
  }
}
