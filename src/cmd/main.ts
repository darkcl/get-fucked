#!/usr/bin/env node

import "reflect-metadata";
import "module-alias/register";

import { RootModule } from "~core/modules/root.module";
import { Application } from "./application";

const bootstrap = () => {
  const controllers: any[] = Application.load(RootModule);
  console.log(controllers[0].getFucked());
  var myArgs = process.argv.slice(2);
  console.log("myArgs: ", myArgs);
};

bootstrap();
