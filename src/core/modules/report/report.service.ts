import { Injectable } from "~lib/injector";

@Injectable()
export class ReportService {
  generate(alertShortName: string) {
    console.log(`Generating report for ${alertShortName}`);
  }
}
