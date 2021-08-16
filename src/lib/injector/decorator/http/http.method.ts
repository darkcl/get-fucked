export const HTTP_HANDLER_KEY = "http_handler";

export type HttpMetaData = {
  path: string;
  middlewares: NewableFunction[];
  method: string;
  methodName: string;
};

const createHttpMethodDecorator = (method: string) => {
  return (
    path: string = "/",
    middlewares: NewableFunction[] = []
  ): MethodDecorator => {
    return (
      target: Object,
      methodName: string,
      descriptor: PropertyDescriptor
    ) => {
      const httpMap: Record<string, HttpMetaData> =
        Reflect.getMetadata(HTTP_HANDLER_KEY, target.constructor) ?? {};

      httpMap[methodName] = { path, middlewares, method, methodName };

      Reflect.defineMetadata(HTTP_HANDLER_KEY, httpMap, target.constructor);
    };
  };
};

export const Get = createHttpMethodDecorator("get");
export const Post = createHttpMethodDecorator("post");
export const Put = createHttpMethodDecorator("put");
export const Delete = createHttpMethodDecorator("delete");
export const Patch = createHttpMethodDecorator("patch");
