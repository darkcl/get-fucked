export const COMMANDS_KEY = "commands";

type CommandDecoratorOption = {
  isGuided?: boolean;
};

export const Command = (
  name: string = "",
  { isGuided = false }: CommandDecoratorOption = {}
) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let commands = Reflect.getMetadata(COMMANDS_KEY, target.constructor);
    if (!commands) {
      commands = {};
    }

    commands[name] = { propertyKey, isGuided };

    Reflect.defineMetadata(COMMANDS_KEY, commands, target.constructor);
  };
};
