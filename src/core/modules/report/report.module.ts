import { Module } from "~lib/modules";
import { ReportController } from "./report.controller";
import { ReportService } from "./report.service";

@Module({
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
