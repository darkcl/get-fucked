export const COMMANDS_KEY = "commands";

export const Command = (name: string = "") => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const commands =
      Reflect.getMetadata(COMMANDS_KEY, target.constructor) ?? {};

    commands[name] = { propertyKey };

    Reflect.defineMetadata(COMMANDS_KEY, commands, target.constructor);
  };
};
