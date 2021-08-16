import { MODULE_IMPORTS_KEY, MODULE_KEY } from "~lib/modules/decorators";
import { loadModule } from "~lib/modules/decorators/module.load";
import { loadController } from "~lib/modules/decorators/module.load.fn";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export class Application {
  static load(module: NewableFunction, controllers: unknown[] = []) {
    const isModule = Reflect.getMetadata(MODULE_KEY, module);
    if (!isModule) throw new Error(`${module.name} is not a module`);

    const depMap = loadModule(module);
    controllers.push(...loadController(module, depMap));

    const imports = Reflect.getMetadata(MODULE_IMPORTS_KEY, module);
    if (imports.length !== 0) {
      for (const importModule of imports) {
        controllers.push(...Application.load(importModule));
      }
    }
    return controllers;
  }
}
