import {
  Command,
  CommandContext,
  Controller,
  Get,
  Params,
} from "~lib/injector";
import { ReportEntity } from "./report.entity";
import { ReportService } from "./report.service";

@Controller("report", {
  description: "Report if someone fucked over your service",
})
export class ReportController {
  constructor(private service: ReportService) {}

  @Command("generate")
  @Get(":id")
  async generate(
    @Params("id") @CommandContext() alertShortName: string
  ): Promise<ReportEntity[]> {
    return await this.service.generate(alertShortName);
  }
}
