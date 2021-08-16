import { Module } from "~lib/modules";
import { ReportController } from "./report.controller";

@Module({
  controllers: [ReportController],
})
export class ReportModule {}
