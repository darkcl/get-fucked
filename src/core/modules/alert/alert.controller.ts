import { Controller } from "~lib/injector";
import { AlertService } from "./alert.service";

@Controller("alert", { description: "Alert resource" })
export class AlertController {
  constructor(private service: AlertService) {}

  getFucked() {
    return this.service.getFucked();
  }
}
