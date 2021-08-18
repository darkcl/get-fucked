import { Injectable } from "~lib/injector";
import { ConfigService } from "../config/config.service";
import { HttpService } from "../http/http.service";

@Injectable()
export class BitbucketService {
  constructor(private http: HttpService, private config: ConfigService) {}

  private async fetchPaged(url: string, page: number = 1, values = []) {
    const auth =
      "Basic " +
      Buffer.from(
        this.config.bitbucketUser + ":" + this.config.bitbucketPassword
      ).toString("base64");
    const res = await this.http.get(`${url}&page=${page}`, {
      headers: { Authorization: auth },
    });

    const result = await res.json();
    values.push(...result.values);

    if (result.next) {
      return this.fetchPaged(result.next, page + 1, values);
    }

    return values;
  }

  async getPullRequests(repository: string, keywords: string[]) {
    const url = `https://api.bitbucket.org/2.0/repositories/${repository}/pullrequests?q=${encodeURI(
      `state = "OPEN" AND (${keywords
        .map((v) => `title ~ "${v}"`)
        .join(" OR ")})`
    )}`;
    const res = await this.fetchPaged(url);

    return res.map((v) => {
      return {
        title: v.title,
        url: v.links.html.href,
      };
    });
  }
}
