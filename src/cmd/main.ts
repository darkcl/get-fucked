import "reflect-metadata";
import "module-alias/register";

import { RootModule } from "~core/modules/root.module";
import { Application } from "~lib/application";

const bootstrap = () => {
  const controllers: any[] = Application.load(RootModule);
  console.log(controllers[0].getFucked());
};

bootstrap();
