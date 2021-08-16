export class AlertEntity {
  name: string;
  shortName: string;
  service: string;
  repositories: string[];
  triggers: string[];

  constructor(opt: Partial<AlertEntity>) {
    Object.assign(this, opt);
  }
}
