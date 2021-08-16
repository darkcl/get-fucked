import { Injectable } from "~lib/injector";
import { HttpService } from "../http/http.service";

@Injectable()
export class AlertService {
  constructor(private http: HttpService) {}

  getFucked() {
    return "I am fucked";
  }
}
