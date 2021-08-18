import { Injectable } from "~lib/injector";
import { AlertService } from "../alert/alert.service";
import { BitbucketService } from "../bitbucket/bitbucket.service";
import { ReportEntity } from "./report.entity";

@Injectable()
export class ReportService {
  constructor(
    private alertService: AlertService,
    private bitbucket: BitbucketService
  ) {}

  async generate(alertShortName: string): Promise<ReportEntity[]> {
    const alert = this.alertService.get(alertShortName);
    if (!alert) {
      console.log(`Alert ${alertShortName} not found`);
      return;
    }

    console.log(`Generating report for ${alert.name}`);

    const reports = [];
    for (const repository of alert.repositories) {
      const pullRequests = await this.bitbucket.getPullRequests(
        repository,
        alert.triggers
      );

      reports.push(new ReportEntity({ repository, pullRequests }));
    }

    return reports;
  }
}
