#!/usr/bin/env node

import "reflect-metadata";
import "module-alias/register";
require("dotenv").config();

import { Application } from "./application";
import { RootModule } from "~core/modules/root.module";

const bootstrap = () => {
  Application.load(RootModule);
};

bootstrap();
