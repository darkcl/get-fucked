import { Injectable } from "~lib/injector";
import { AlertService } from "../alert/alert.service";
import { BitbucketService } from "../bitbucket/bitbucket.service";

@Injectable()
export class ReportService {
  constructor(
    private alertService: AlertService,
    private bitbucket: BitbucketService
  ) {}

  async generate(alertShortName: string) {
    const alert = this.alertService.get(alertShortName);
    if (!alert) {
      console.log(`Alert ${alertShortName} not found`);
      return;
    }

    for (const repository of alert.repositories) {
      const pullRequest = await this.bitbucket.getPullRequestDiff(repository);
    }

    console.log(`Generating report for ${alert.name}`);
  }
}
