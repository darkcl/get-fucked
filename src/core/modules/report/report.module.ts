import { Module } from "~lib/modules/decorators";
import { ReportController } from "./report.controller";

@Module({
  controllers: [ReportController],
})
export class ReportModule {}
