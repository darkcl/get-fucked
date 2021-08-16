import { Injectable } from "~lib/injector";
import { AlertCreateDto } from "./alert.create.dto";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { AlertEntity } from "./alert.entity";

@Injectable()
export class AlertService {
  get(shortName: string) {
    const alerts: any[] = existsSync("data/alerts.json")
      ? JSON.parse(readFileSync("data/alerts.json", "utf8"))
      : [];

    const result = alerts.find((alert) => alert.shortName === shortName);
    if (!result) return null;

    return new AlertEntity(result);
  }

  create(dto: AlertCreateDto) {
    const alerts = existsSync("data/alerts.json")
      ? JSON.parse(readFileSync("data/alerts.json", "utf8"))
      : [];
    alerts.push(dto);
    writeFileSync("data/alerts.json", JSON.stringify(alerts, null, 2));
    return new AlertEntity(dto);
  }

  list() {
    const alerts = existsSync("data/alerts.json")
      ? JSON.parse(readFileSync("data/alerts.json", "utf8"))
      : [];

    return alerts.map((v) => new AlertEntity(v));
  }
}
