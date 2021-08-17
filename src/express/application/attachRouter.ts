import { Express, NextFunction, Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { join } from "path";
import {
  CONTROLLER_PATH_KEY,
  HttpMetaData,
  HttpParamMeta,
  HTTP_HANDLER_KEY,
  HTTP_PARAM_HANDLER,
} from "~lib/injector";
import { CONTAINER_MODULE_KEY, loadDependency, loadModule } from "~lib/modules";

export const attachRouter = (controller: NewableFunction, app: Express) => {
  const basePath = Reflect.getMetadata(CONTROLLER_PATH_KEY, controller);
  const containerModule = Reflect.getMetadata(CONTAINER_MODULE_KEY, controller);
  const paramMap = Reflect.getMetadata(HTTP_PARAM_HANDLER, controller);

  const depMap = loadModule(containerModule);
  const controllerInstance = loadDependency(controller, depMap);
  if (!controllerInstance) throw new Error("Unable to load dependency");

  const httpMap: Record<string, HttpMetaData> =
    Reflect.getMetadata(HTTP_HANDLER_KEY, controller) ?? {};

  for (const [_key, value] of Object.entries(httpMap)) {
    const paramTypes = Reflect.getMetadata(
      "design:paramtypes",
      controllerInstance,
      value.methodName
    );
    const reqPath = `/${join(basePath, value.path)}`;

    const handler = (req: Request, res: Response, next: NextFunction) => {
      const args = [];
      const methodMap: Record<number, HttpParamMeta> =
        paramMap[value.methodName] ?? {};

      for (const paramType of paramTypes) {
        const meta: HttpParamMeta = methodMap[paramTypes.indexOf(paramType)];
        if (!meta) {
          args.push(undefined);
          continue;
        }
        const { handler, name } = meta;
        const result = handler({ req, res, next }, name);

        args.push(plainToClass(paramType, result));
      }

      const result = controllerInstance[value.methodName](...args);
      res.send(result);
    };

    switch (value.method) {
      case "get":
        app.get(reqPath, handler);
        break;
      case "post":
        app.post(reqPath, handler);
        break;
      case "put":
        app.put(reqPath, handler);
        break;
      case "patch":
        app.patch(reqPath, handler);
        break;
      case "delete":
        app.delete(reqPath, handler);
        break;
      default:
        break;
    }

    console.log(
      `Load path '${value.method.toUpperCase()} ${reqPath}' to map to '${
        controller.name
      }#${value.methodName}'`
    );
  }
};
