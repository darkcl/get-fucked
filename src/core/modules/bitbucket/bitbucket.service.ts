import { Injectable } from "~lib/injector";
import { ConfigService } from "../config/config.service";
import { HttpService } from "../http/http.service";

@Injectable()
export class BitbucketService {
  constructor(private http: HttpService, private config: ConfigService) {}

  getPullRequestDiff(repository: string) {
    return "ok";
  }
  getPullRequest(repository: string) {
    throw new Error("Method not implemented.");
  }
}
