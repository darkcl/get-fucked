import { MODULE_CONTROLLERS_KEY, MODULE_IMPORTS_KEY } from "~lib/modules";

export const loadControllersFromModule = (
  module: NewableFunction
): NewableFunction[] => {
  const controllers = Reflect.getMetadata(MODULE_CONTROLLERS_KEY, module);
  const imports = Reflect.getMetadata(MODULE_IMPORTS_KEY, module);
  for (const importModule of imports) {
    controllers.push(
      ...loadControllersFromModule(importModule).filter(
        (v) => controllers.indexOf(v) === -1
      )
    );
  }
  return controllers;
};
