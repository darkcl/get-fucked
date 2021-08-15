import {
  MODULE_EXPORTS_KEY,
  MODULE_IMPORTS_KEY,
  MODULE_PROVIDERS_KEY,
} from "./const";

type ModuleLoaderFunction = (
  target: NewableFunction
) => Record<string, NewableFunction>;

export const loadModule: ModuleLoaderFunction = (target: NewableFunction) => {
  const dependencyMap = {};
  const imports = Reflect.getMetadata(MODULE_IMPORTS_KEY, target);
  for (const importModule of imports) {
    const exports = Reflect.getMetadata(MODULE_EXPORTS_KEY, importModule);
    for (const e of exports) {
      dependencyMap[e.name] = e;
    }
  }

  const providers = Reflect.getMetadata(MODULE_PROVIDERS_KEY, target);
  for (const p of providers) {
    dependencyMap[p.name] = p;
  }

  return dependencyMap;
};
