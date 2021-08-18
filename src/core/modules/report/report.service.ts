import { Injectable } from "~lib/injector";
import { AlertService } from "../alert/alert.service";

@Injectable()
export class ReportService {
  constructor(private alertService: AlertService) {}

  generate(alertShortName: string) {
    console.log(`Generating report for ${alertShortName}`);
    const alert = this.alertService.get(alertShortName);
    return alert;
  }
}
