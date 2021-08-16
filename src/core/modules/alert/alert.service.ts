import { Injectable } from "~lib/injector";
import { AlertCreateDto } from "./alert.create.dto";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { AlertEntity } from "./alert.entity";
import { AlertUpdateDto } from "./alert.update.dto";

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

  update(shortName: string, dto: AlertUpdateDto) {
    const alerts: any[] = existsSync("data/alerts.json")
      ? JSON.parse(readFileSync("data/alerts.json", "utf8"))
      : [];

    const resultIdx = alerts.findIndex(
      (alert) => alert.shortName === shortName
    );
    if (resultIdx === -1) return null;

    const result = alerts[resultIdx];

    for (const [key, value] of Object.entries(dto)) {
      if (value) {
        result[key] = value;
      }
    }
    alerts[resultIdx] = result;
    writeFileSync("data/alerts.json", JSON.stringify(alerts, null, 2));

    return result;
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
