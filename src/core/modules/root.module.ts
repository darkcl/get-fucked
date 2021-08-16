import { Module } from "~lib/modules";
import { AlertModule } from "./alert";
import { ReportModule } from "./report";

@Module({
  imports: [AlertModule, ReportModule],
})
export class RootModule {}
