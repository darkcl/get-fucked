export const INJECTABLE_KEY = "injectable";

export const Injectable = () => {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(INJECTABLE_KEY, true, target);
  };
};
