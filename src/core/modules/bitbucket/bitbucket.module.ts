import { Module } from "~lib/modules";
import { ConfigModule } from "../config/config.module";
import { HttpModule } from "../http/http.module";
import { BitbucketService } from "./bitbucket.service";

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [BitbucketService],
  exports: [BitbucketService],
})
export class BitbucketModule {}
