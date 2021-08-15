export const CONTROLLER_KEY = "controller";

export const Controller = (path: string = "") => {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(CONTROLLER_KEY, path, target);
  };
};
