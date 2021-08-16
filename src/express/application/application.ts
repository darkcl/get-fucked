import express from "express";

import { MODULE_KEY, loadControllersFromModule } from "~lib/modules";
import { attachRouter } from "./attachRouter";

export class Application {
  static load(module: NewableFunction, port: number = 3000) {
    const isModule = Reflect.getMetadata(MODULE_KEY, module);
    if (!isModule) throw new Error(`${module.name} is not a module`);

    const app = express();

    const controllers = loadControllersFromModule(module);
    for (const controller of controllers) {
      attachRouter(controller, app);
    }

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
}
