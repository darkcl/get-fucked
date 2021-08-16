import { CONTAINER_MODULE_KEY, loadModule, loadDependency } from "~lib/modules";
import yargs from "yargs";
import {
  CONTROLLER_DESCRIPTION_KEY,
  CONTROLLER_PATH_KEY,
  COMMANDS_KEY,
  ANSWERS_KEY,
} from "~lib/injector";
import readline from "readline";
import { questionAsync } from "../lib/readlineAsync";

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
    async (argv) => {
      const controllerInstance = loadDependency(controller, depMap);
      if (!controllerInstance) throw new Error("Unable to load dependency");

      const functionName = commandsMap[argv.command as string]["propertyKey"];
      const isGuided = commandsMap[argv.command as string]["isGuided"];
      const paramTypes = Reflect.getMetadata(
        "design:paramtypes",
        controllerInstance,
        functionName
      );

      if (isGuided && paramTypes.length > 0) {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        const args = [];

        for (const paramType of paramTypes) {
          const questionMap = Reflect.getMetadata(ANSWERS_KEY, paramType);
          const fields = Object.keys(questionMap).sort(
            (a, b) => questionMap[a].order - questionMap[b].order
          );

          const arg = new paramType();

          for (const field of fields) {
            const { question, handler } = questionMap[field];
            const answer = await questionAsync(`${question} `, rl);
            arg[field] = handler(answer);
          }

          args.push(arg);
        }

        console.log(controllerInstance[functionName](...args));
        rl.close();
        return;
      }

      console.log(controllerInstance[functionName](argv.context));
    }
  );
};
