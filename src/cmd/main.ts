#!/usr/bin/env node

import "reflect-metadata";
import "module-alias/register";
require("dotenv").config();

import { RootModule } from "~core/modules/root.module";
import { Application } from "./application";

const bootstrap = () => {
  Application.load(RootModule);
};

bootstrap();
