import "reflect-metadata";
import "module-alias/register";

import { RootModule } from "~core/modules/root.module";

const bootstrap = () => {
  const module = new RootModule();

  console.log(module);
};

bootstrap();
