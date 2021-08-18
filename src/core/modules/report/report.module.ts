import { Module } from "~lib/modules";
import { AlertModule } from "../alert";
import { ReportController } from "./report.controller";
import { ReportService } from "./report.service";

@Module({
  imports: [AlertModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
