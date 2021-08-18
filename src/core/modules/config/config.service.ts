import { Injectable } from "~lib/injector";

@Injectable()
export class ConfigService {
  get bitbucketUser(): string {
    return process.env.BITBUCKET_USER;
  }

  get bitbucketPassword(): string {
    return process.env.BITBUCKET_PASSWORD;
  }
}
