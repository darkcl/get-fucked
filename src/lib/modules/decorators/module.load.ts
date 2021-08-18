import {
  MODULE_EXPORTS_KEY,
  MODULE_IMPORTS_KEY,
  MODULE_PROVIDERS_KEY,
} from "./const";

type ModuleLoaderFunction = (
  target: NewableFunction
) => Record<string, NewableFunction>;

const loadImportModule = (
  target: NewableFunction
): Record<string, NewableFunction> => {
  const dependencyMap = {};

  const exports = Reflect.getMetadata(MODULE_EXPORTS_KEY, target);
  for (const e of exports) {
    dependencyMap[e.name] = e;
  }

  const imports = Reflect.getMetadata(MODULE_IMPORTS_KEY, target);
  for (const importModule of imports) {
    const nested = loadImportModule(importModule);
    for (const [key, value] of Object.entries(nested)) {
      dependencyMap[key] = value;
    }
  }
  return dependencyMap;
};

const loadModule: ModuleLoaderFunction = (target: NewableFunction) => {
  const dependencyMap = {};
  const importsMap = loadImportModule(target);
  for (const [key, value] of Object.entries(importsMap)) {
    dependencyMap[key] = value;
  }

  const providers = Reflect.getMetadata(MODULE_PROVIDERS_KEY, target);
  for (const p of providers) {
    dependencyMap[p.name] = p;
  }

  return dependencyMap;
};

export { loadModule };
