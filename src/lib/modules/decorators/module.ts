import { ModuleOption } from "../module.options";
import {
  MODULE_CONTROLLERS_KEY,
  MODULE_IMPORTS_KEY,
  MODULE_EXPORTS_KEY,
  MODULE_PROVIDERS_KEY,
  MODULE_KEY,
  MODULE_PARENT_KEY,
} from "./const";

export const Module = ({
  controllers = [],
  imports = [],
  exports = [],
  providers = [],
}: ModuleOption) => {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(MODULE_KEY, true, target);

    Reflect.defineMetadata(MODULE_IMPORTS_KEY, imports, target);
    Reflect.defineMetadata(MODULE_CONTROLLERS_KEY, controllers, target);
    Reflect.defineMetadata(MODULE_EXPORTS_KEY, exports, target);
    Reflect.defineMetadata(MODULE_PROVIDERS_KEY, providers, target);

    for (const importModule of imports) {
      const isModule = Reflect.getMetadata(MODULE_KEY, importModule);
      if (!isModule) throw new Error(`${importModule.name} is not a module`);

      Reflect.defineMetadata(MODULE_PARENT_KEY, target, importModule);
    }
  };
};
