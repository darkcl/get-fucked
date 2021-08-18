import { CommandOutput } from "~lib/injector";

export class ReportEntity {
  @CommandOutput({
    handler: (v) => console.log(`========= ${v} =========`),
    order: 0,
  })
  repository: string;

  @CommandOutput({
    handler: (prs) => {
      for (const pr of prs) {
        console.log("Title:", pr.title);
        console.log("URL:", pr.url);
        console.log("--------");
      }
    },
    order: 1,
  })
  pullRequests: Record<string, string>[];

  constructor(opts: Partial<ReportEntity>) {
    Object.assign(this, opts);
  }
}
