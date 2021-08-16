import { Module } from "~lib/modules/decorators";
import { HttpModule } from "../http/http.module";
import { AlertController } from "./alert.controller";
import { AlertService } from "./alert.service";

@Module({
  imports: [HttpModule],
  controllers: [AlertController],
  providers: [AlertService],
})
export class AlertModule {}
