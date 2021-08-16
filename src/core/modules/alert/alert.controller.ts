import { Controller, Command } from "~lib/injector";
import { AlertCreateDto } from "./alert.create.dto";
import { AlertService } from "./alert.service";

@Controller("alert", { description: "Alert resource" })
export class AlertController {
  constructor(private service: AlertService) {}

  @Command("get")
  get(shortName: string) {
    return this.service.get(shortName);
  }

  @Command("create", { isGuided: true })
  create(context: AlertCreateDto) {
    return this.service.create(context);
  }

  @Command("list")
  list() {
    return this.service.list();
  }
}
