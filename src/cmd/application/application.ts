import { MODULE_KEY } from "~lib/modules";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { loadControllersFromModule } from "./loadControllersFromModule";
import { attachCommand } from "./attachCommand";

export class Application {
  static load(module: NewableFunction) {
    const isModule = Reflect.getMetadata(MODULE_KEY, module);
    if (!isModule) throw new Error(`${module.name} is not a module`);
    const commands = yargs(hideBin(process.argv));

    // Getting all controllers and respective commands
    const controllers = loadControllersFromModule(module);
    for (const controller of controllers) {
      attachCommand(controller, commands);
    }

    commands.help().argv;
  }
}
