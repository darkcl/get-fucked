import { Injectable } from "~lib/injector";
import { AlertService } from "../alert/alert.service";

@Injectable()
export class ReportService {
  constructor(private alertService: AlertService) {}

  generate(alertShortName: string) {
    const alert = this.alertService.get(alertShortName);
    if (!alert) {
      console.log(`Alert ${alertShortName} not found`);
      return;
    }

    console.log(`Generating report for ${alert.name}`);
  }
}
