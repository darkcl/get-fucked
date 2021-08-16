import {
  Controller,
  Command,
  GuidedContext,
  CommandContext,
  Get,
  Post,
  Patch,
  Params,
  Body,
} from "~lib/injector";
import { AlertCreateDto } from "./alert.create.dto";
import { AlertService } from "./alert.service";
import { AlertUpdateDto } from "./alert.update.dto";

@Controller("alert", { description: "Alert resource" })
export class AlertController {
  constructor(private service: AlertService) {}

  @Command("get")
  @Get(":id")
  get(@Params("id") shortName: string) {
    return this.service.get(shortName);
  }

  @Command("create")
  @Post()
  create(
    @Body()
    @GuidedContext()
    dto: AlertCreateDto
  ) {
    return this.service.create(dto);
  }

  @Command("update")
  @Patch(":id")
  update(
    @Params("id")
    @CommandContext()
    shortName: string,
    @GuidedContext() dto: AlertUpdateDto
  ) {
    return this.service.update(shortName, dto);
  }

  @Command("list")
  @Get()
  list() {
    return this.service.list();
  }
}
