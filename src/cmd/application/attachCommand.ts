import { CONTAINER_MODULE_KEY, loadModule, loadDependency } from "~lib/modules";
import yargs from "yargs";
import {
  CONTROLLER_DESCRIPTION_KEY,
  CONTROLLER_PATH_KEY,
  COMMANDS_KEY,
  ANSWERS_KEY,
  GUIDED_CONTEXT_KEY,
  COMMAND_CONTEXT_KEY,
  COMMAND_OUTPUT_KEY,
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
  const controllerInstance = loadDependency(controller, depMap);
  if (!controllerInstance) throw new Error("Unable to load dependency");

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
      const functionName = commandsMap[argv.command as string]["propertyKey"];
      const paramTypes = Reflect.getMetadata(
        "design:paramtypes",
        controllerInstance,
        functionName
      );

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const args = [];

      for (const paramType of paramTypes) {
        const isGuided = Reflect.getMetadata(GUIDED_CONTEXT_KEY, paramType);
        const isContext = Reflect.getMetadata(COMMAND_CONTEXT_KEY, paramType);

        if (isGuided) {
          const questionMap = Reflect.getMetadata(ANSWERS_KEY, paramType);
          const fields = Object.keys(questionMap).sort(
            (a, b) => questionMap[a].order - questionMap[b].order
          );

          const arg = new paramType();

          for (const field of fields) {
            const { question, handler } = questionMap[field];
            const answer = await questionAsync(`${question} `, rl);
            arg[field] = answer ? handler(answer) : undefined;
          }

          args.push(arg);
        } else if (isContext) {
          args.push(argv.context);
        } else {
          args.push(undefined);
        }
      }

      const result = await controllerInstance[functionName](...args);

      if (Array.isArray(result)) {
        for (const item of result) {
          outputResult(item);
          console.log("\n");
        }
      } else {
        outputResult(result);
      }
      rl.close();
    }
  );
};

function outputResult(result: any) {
  const outputHandlerMap = Reflect.getOwnMetadata(
    COMMAND_OUTPUT_KEY,
    result.constructor
  );

  if (outputHandlerMap) {
    const fields = Object.keys(outputHandlerMap).sort(
      (a, b) => outputHandlerMap[a].order - outputHandlerMap[b].order
    );
    for (const field of fields) {
      const { handler } = outputHandlerMap[field];
      handler(result[field], field);
    }
  } else {
    console.log(result);
  }
}
