export const COMMAND_CONTEXT_KEY = "command_context";

export const CommandContext = () => {
  return function (target: any, methodName: string, index: number) {
    const paramTypes = Reflect.getMetadata(
      "design:paramtypes",
      target,
      methodName
    );

    Reflect.defineMetadata(COMMAND_CONTEXT_KEY, true, paramTypes[index]);
  };
};
