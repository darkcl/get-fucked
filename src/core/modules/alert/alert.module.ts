import { Module } from "~lib/modules/decorators";
import { AlertController } from "./alert.controller";
import { AlertService } from "./alert.service";

@Module({
  controllers: [AlertController],
  providers: [AlertService],
})
export class AlertModule {}
