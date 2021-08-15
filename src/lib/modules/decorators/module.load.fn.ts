import { MODULE_CONTROLLERS_KEY, MODULE_IMPORTS_KEY } from "./const";

export type ModuleDependencyLoaderFunction = (
  target: NewableFunction,
  dependencyMap: Record<string, NewableFunction>
) => unknown;

export type ModuleControllerLoaderFunction = (
  target: NewableFunction,
  dependencyMap: Record<string, NewableFunction>
) => unknown[];

export const loadDependency: ModuleDependencyLoaderFunction = (
  target: NewableFunction,
  dependencyMap: Record<string, NewableFunction>
) => {
  const types = Reflect.getMetadata("design:paramtypes", target);
  if (!types) return new (target as { new (...args: any[]): any })();

  const args = [];
  for (const t of types) {
    const dep = dependencyMap[t.name];
    if (!dep)
      throw new Error(
        `${t.name} is not provided in ${target.name} index ${types.indexOf(t)}`
      );

    args.push(loadDependency(dep, dependencyMap));
  }

  return new (target as { new (...args: any[]): any })(...args);
};

export const loadController: ModuleControllerLoaderFunction = (
  target: NewableFunction,
  dependencyMap: Record<string, NewableFunction>
) => {
  const controllers = Reflect.getMetadata(MODULE_CONTROLLERS_KEY, target);
  return controllers.map((v) => loadDependency(v, dependencyMap));
};
