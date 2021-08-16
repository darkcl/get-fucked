export const COMMANDS_KEY = "commands";

type CommandDecoratorOption = {
  guidedContext?: boolean;
};

export const Command = (
  name: string = "",
  { guidedContext = false }: CommandDecoratorOption = {}
) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let commands = Reflect.getMetadata(COMMANDS_KEY, target.constructor);
    if (!commands) {
      commands = {};
    }

    commands[name] = { propertyKey, guidedContext };

    Reflect.defineMetadata(COMMANDS_KEY, commands, target.constructor);
  };
};
