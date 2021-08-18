import { Module } from "~lib/modules";
import { ConfigService } from "./config.service";

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
