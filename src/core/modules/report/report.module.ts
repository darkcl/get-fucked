import { Module } from "~lib/modules";
import { AlertModule } from "../alert";
import { BitbucketModule } from "../bitbucket/bitbucket.module";
import { ReportController } from "./report.controller";
import { ReportService } from "./report.service";

@Module({
  imports: [AlertModule, BitbucketModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
