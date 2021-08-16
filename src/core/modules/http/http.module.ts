import { Module } from "~lib/modules/decorators";
import { HttpService } from "./http.service";

@Module({
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {}
