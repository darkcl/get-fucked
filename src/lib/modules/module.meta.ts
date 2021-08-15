import { ModuleOption } from "./module.options";

export class ModuleMeta {
  public getMeta() {
    return {};
  }

  public setMeta({ controllers, imports, exports, providers }: ModuleOption) {}
}
