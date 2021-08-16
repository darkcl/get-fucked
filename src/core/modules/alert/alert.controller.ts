import { Controller, Command } from "~lib/injector";
import { AlertCreateDto } from "./alert.create.dto";
import { AlertService } from "./alert.service";

@Controller("alert", { description: "Alert resource" })
export class AlertController {
  constructor(private service: AlertService) {}

  @Command("get")
  getFucked() {
    return this.service.getFucked();
  }

  @Command("create", { isGuided: true })
  fuckMe(context: AlertCreateDto) {
    return this.service.create(context);
  }

  @Command("list")
  fuckYall() {
    return "A lot of fucks";
  }
}
