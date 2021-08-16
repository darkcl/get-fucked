import { Injectable } from "~lib/injector";
import { default as fetch, RequestInit, Response } from "node-fetch";

@Injectable()
export class HttpService {
  public async request(url: string, options: RequestInit): Promise<Response> {
    const res = await fetch(url, options);
    return res;
  }

  public async get(url: string, options: RequestInit = {}): Promise<Response> {
    return await this.request(url, { ...options, method: "GET" });
  }

  public async post(url: string, options: RequestInit): Promise<Response> {
    return await this.request(url, { ...options, method: "POST" });
  }

  public async put(url: string, options: RequestInit): Promise<Response> {
    return await this.request(url, { ...options, method: "PUT" });
  }

  public async delete(url: string, options: RequestInit): Promise<Response> {
    return await this.request(url, { ...options, method: "DELETE" });
  }

  public async patch(url: string, options: RequestInit): Promise<Response> {
    return await this.request(url, { ...options, method: "PATCH" });
  }
}
