import {
  Controller,
  Command,
  GuidedContext,
  CommandContext,
} from "~lib/injector";
import { AlertCreateDto } from "./alert.create.dto";
import { AlertService } from "./alert.service";
import { AlertUpdateDto } from "./alert.update.dto";

@Controller("alert", { description: "Alert resource" })
export class AlertController {
  constructor(private service: AlertService) {}

  @Command("get")
  get(shortName: string) {
    return this.service.get(shortName);
  }

  @Command("create")
  create(
    @GuidedContext()
    dto: AlertCreateDto
  ) {
    return this.service.create(dto);
  }

  @Command("update")
  update(
    @CommandContext() shortName: string,
    @GuidedContext() dto: AlertUpdateDto
  ) {
    return this.service.update(shortName, dto);
  }

  @Command("list")
  list() {
    return this.service.list();
  }
}
