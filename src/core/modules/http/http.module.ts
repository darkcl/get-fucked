import { Module } from "~lib/modules";
import { HttpService } from "./http.service";

@Module({
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {}
