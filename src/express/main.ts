#!/usr/bin/env node

import "reflect-metadata";
import "module-alias/register";

import { Application } from "./application/application";
import { RootModule } from "~core/modules/root.module";

const bootstrap = () => {
  Application.load(RootModule);
};

bootstrap();
