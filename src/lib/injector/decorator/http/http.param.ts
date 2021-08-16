import { NextFunction, Request, Response } from "express";

export const HTTP_PARAM_HANDLER = "http_param_handler";

export type ExpressContext = {
  req: Request;
  res: Response;
  next: NextFunction;
};

export type ParamsHandler = (ctx: ExpressContext, name: string) => any;
export type HttpParamMeta = {
  handler: ParamsHandler;
  name: string;
};

export function createParamsDecorator(handler: ParamsHandler) {
  return function (name?: string): ParameterDecorator {
    return function (target: any, methodName: string, index: number) {
      const paramMap =
        Reflect.getMetadata(HTTP_PARAM_HANDLER, target.constructor) ?? {};
      const methodMap = paramMap[methodName] ?? {};
      methodMap[index] = { handler, name };
      paramMap[methodName] = methodMap;

      Reflect.defineMetadata(HTTP_PARAM_HANDLER, paramMap, target.constructor);
    };
  };
}

export const Req = createParamsDecorator((ctx, name) => {
  return name ? ctx.req[name] : ctx.req;
});

export const Res = createParamsDecorator((ctx, name) => {
  return name ? ctx.res[name] : ctx.res;
});

export const Next = createParamsDecorator((ctx, name) => {
  return ctx.next;
});

export const Params = createParamsDecorator((ctx, name) => {
  return name ? ctx.req.params[name] : ctx.req.params;
});

export const Query = createParamsDecorator((ctx, name) => {
  return name ? ctx.req.query[name] : ctx.req.query;
});

export const Body = createParamsDecorator((ctx, name) => {
  return name ? ctx.req.body[name] : ctx.req.body;
});

export const Headers = createParamsDecorator((ctx, name) => {
  return name ? ctx.req.headers[name] : ctx.req.headers;
});

export const Cookies = createParamsDecorator((ctx, name) => {
  return name ? ctx.req.cookies[name] : ctx.req.cookies;
});
