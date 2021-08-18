export const COMMAND_OUTPUT_KEY = "command_output";

type CommandOutputOption = {
  handler?: (value: any) => void;
  order?: number;
};

export const CommandOutput = ({
  handler = (value: any) => console.log(value),
  order = 0,
}: CommandOutputOption = {}) => {
  return (target: any, propertyKey: string) => {
    const output =
      Reflect.getMetadata(COMMAND_OUTPUT_KEY, target.constructor) ?? {};

    output[propertyKey] = { order, handler };

    Reflect.defineMetadata(COMMAND_OUTPUT_KEY, output, target.constructor);
  };
};
