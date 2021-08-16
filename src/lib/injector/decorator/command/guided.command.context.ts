export const GUIDED_CONTEXT_KEY = "guided_context";

export const GuidedContext = () => {
  return function (target: any, methodName: string, index: number) {
    const paramTypes = Reflect.getMetadata(
      "design:paramtypes",
      target,
      methodName
    );

    Reflect.defineMetadata(GUIDED_CONTEXT_KEY, true, paramTypes[index]);
  };
};
