import { Injectable } from "~lib/injector";
import { AlertCreateDto } from "./alert.create.dto";
import { existsSync, readFileSync, writeFileSync } from "fs";

@Injectable()
export class AlertService {
  getFucked() {
    return "I am fucked";
  }

  create(dto: AlertCreateDto) {
    const alerts = existsSync("data/alerts.json")
      ? JSON.parse(readFileSync("data/alerts.json", "utf8"))
      : [];
    alerts.push(dto);
    writeFileSync("data/alerts.json", JSON.stringify(alerts, null, 2));
    return dto;
  }
}
