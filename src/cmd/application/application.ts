import {
  CONTAINER_MODULE_KEY,
  MODULE_CONTROLLERS_KEY,
  MODULE_IMPORTS_KEY,
  MODULE_KEY,
} from "~lib/modules/decorators";
import { loadModule } from "~lib/modules/decorators/module.load";
import { loadDependency } from "~lib/modules/decorators/module.load.fn";

import yargs, { command } from "yargs";
import { hideBin } from "yargs/helpers";
import { CONTROLLER_DESCRIPTION_KEY, CONTROLLER_PATH_KEY } from "~lib/injector";
import { COMMANDS_KEY } from "~lib/injector/decorator/command";

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
  const commandsMap = Reflect.getMetadata(COMMANDS_KEY, controller) ?? {};
  commands.command(
    `${pathName} <command> [context]`,
    description,
    (v) => {
      v.positional("command", {
        describe: `Commands supported: ${Object.keys(commandsMap).join(", ")}`,
        type: "string",
      }).positional("context", {
        describe: "Extra context provided for this command",
      });
    },
    (argv) => {
      const controllerInstance = loadDependency(controller, depMap);
      if (!controllerInstance) throw new Error("Unable to load dependency");

      const functionName = commandsMap[argv.command as string]["propertyKey"];

      console.log(controllerInstance[functionName](argv.context));
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
