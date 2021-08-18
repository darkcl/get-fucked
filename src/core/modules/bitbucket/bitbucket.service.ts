import { Injectable } from "~lib/injector";
import { HttpService } from "../http/http.service";

@Injectable()
export class BitbucketService {
  constructor(private http: HttpService) {}

  getPullRequestDiff(repository: string) {
    throw new Error("Method not implemented.");
  }
  getPullRequest(repository: string) {
    throw new Error("Method not implemented.");
  }
}
