import { ModuleOption } from "../module.options";
import {
  MODULE_CONTROLLERS_KEY,
  MODULE_IMPORTS_KEY,
  MODULE_EXPORTS_KEY,
  MODULE_PROVIDERS_KEY,
  MODULE_KEY,
} from "./const";

export const Module = ({
  controllers = [],
  imports = [],
  exports = [],
  provides = [],
}: ModuleOption) => {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(MODULE_KEY, true, target);

    Reflect.defineMetadata(
      MODULE_CONTROLLERS_KEY,
      controllers.map((v) => v.name),
      target
    );

    Reflect.defineMetadata(
      MODULE_IMPORTS_KEY,
      imports.map((v) => v.name),
      target
    );

    Reflect.defineMetadata(
      MODULE_EXPORTS_KEY,
      exports.map((v) => v.name),
      target
    );

    Reflect.defineMetadata(
      MODULE_PROVIDERS_KEY,
      provides.map((v) => v.name),
      target
    );
  };
};
