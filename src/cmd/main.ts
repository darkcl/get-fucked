#!/usr/bin/env node

import "reflect-metadata";
import "module-alias/register";

import { RootModule } from "~core/modules/root.module";
import { Application } from "./application";

const bootstrap = () => {
  Application.load(RootModule);
};

bootstrap();
