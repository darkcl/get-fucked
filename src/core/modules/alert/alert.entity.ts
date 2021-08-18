import { CommandOutput } from "~lib/injector";

export class AlertEntity {
  @CommandOutput()
  name: string;

  @CommandOutput()
  shortName: string;

  @CommandOutput()
  service: string;

  @CommandOutput()
  repositories: string[];

  @CommandOutput()
  triggers: string[];

  constructor(opt: Partial<AlertEntity>) {
    Object.assign(this, opt);
  }
}
