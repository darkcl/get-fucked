import { Controller, Command } from "~lib/injector";
import { AlertService } from "./alert.service";

@Controller("alert", { description: "Alert resource" })
export class AlertController {
  constructor(private service: AlertService) {}

  @Command("get")
  getFucked() {
    return this.service.getFucked();
  }

  @Command("create")
  fuckMe() {
    return "New fuck is created";
  }

  @Command("list")
  listFucks() {
    return "A lot of fucks";
  }
}
