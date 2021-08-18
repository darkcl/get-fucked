import { Command, CommandContext, Controller } from "~lib/injector";
import { ReportService } from "./report.service";

@Controller("report", {
  description: "Report if someone fucked over your service",
})
export class ReportController {
  constructor(private service: ReportService) {}

  @Command("generate")
  async generate(@CommandContext() alertShortName: string) {
    return await this.service.generate(alertShortName);
  }
}
