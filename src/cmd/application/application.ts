import {
  CONTAINER_MODULE_KEY,
  MODULE_CONTROLLERS_KEY,
  MODULE_IMPORTS_KEY,
  MODULE_KEY,
} from "~lib/modules/decorators";
import { loadModule } from "~lib/modules/decorators/module.load";
import {
  loadController,
  loadDependency,
} from "~lib/modules/decorators/module.load.fn";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { CONTROLLER_DESCRIPTION_KEY, CONTROLLER_PATH_KEY } from "~lib/injector";

const loadControllersFromModule = (module: NewableFunction) => {
  const controllers = Reflect.getMetadata(MODULE_CONTROLLERS_KEY, module);
  const imports = Reflect.getMetadata(MODULE_IMPORTS_KEY, module);
  for (const importModule of imports) {
    controllers.push(...loadControllersFromModule(importModule));
  }
  return controllers;
};

const attachCommand = (
  controller: NewableFunction,
  commands: yargs.Argv<{}>
) => {
  const pathName = Reflect.getMetadata(CONTROLLER_PATH_KEY, controller);
  const description = Reflect.getMetadata(
    CONTROLLER_DESCRIPTION_KEY,
    controller
  );
  const containerModule = Reflect.getMetadata(CONTAINER_MODULE_KEY, controller);
  const depMap = loadModule(containerModule);
  commands.command(
    pathName,
    description,
    () => {},
    (argv) => {
      const controllerInstance = loadDependency(controller, depMap);
      console.log(controllerInstance);
    }
  );
};
export class Application {
  static load(module: NewableFunction) {
    const isModule = Reflect.getMetadata(MODULE_KEY, module);
    if (!isModule) throw new Error(`${module.name} is not a module`);
    const commands = yargs(hideBin(process.argv));

    // Getting all controllers and respective commands
    const controllers = loadControllersFromModule(module);
    for (const controller of controllers) {
      attachCommand(controller, commands);
    }

    commands.help().argv;
  }
}
