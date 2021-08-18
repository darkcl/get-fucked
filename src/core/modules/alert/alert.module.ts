import { Module } from "~lib/modules";
import { HttpModule } from "../http/http.module";
import { AlertController } from "./alert.controller";
import { AlertService } from "./alert.service";

@Module({
  imports: [HttpModule],
  controllers: [AlertController],
  providers: [AlertService],
  exports: [AlertService],
})
export class AlertModule {}
