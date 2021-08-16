export const CONTROLLER_PATH_KEY = "controller";
export const CONTROLLER_DESCRIPTION_KEY = "controller_description";

type ControllerDecoratorOptions = {
  description?: string;
};

export const Controller = (
  path: string = "",
  { description = "" }: ControllerDecoratorOptions = {}
) => {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(CONTROLLER_PATH_KEY, path, target);
    Reflect.defineMetadata(CONTROLLER_DESCRIPTION_KEY, description, target);
  };
};
