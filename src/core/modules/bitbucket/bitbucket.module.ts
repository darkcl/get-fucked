import { Module } from "~lib/modules";
import { HttpModule } from "../http/http.module";
import { BitbucketService } from "./bitbucket.service";

@Module({
  imports: [HttpModule],
  providers: [BitbucketService],
  exports: [BitbucketService],
})
export class BitbucketModule {}
