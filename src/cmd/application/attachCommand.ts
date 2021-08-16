import { CONTAINER_MODULE_KEY, loadModule, loadDependency } from "~lib/modules";
import yargs from "yargs";
import {
  CONTROLLER_DESCRIPTION_KEY,
  CONTROLLER_PATH_KEY,
  COMMANDS_KEY,
} from "~lib/injector";

export const attachCommand = (
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
