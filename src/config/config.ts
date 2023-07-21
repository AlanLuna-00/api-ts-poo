import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { AppDataSource } from "./data.source";

// abstract no se puede instanciar solo heredar
export abstract class ConfigServer {
  constructor() {
    const nodeNameEnv = this.createPathEnv(this.nodeEnv);
    dotenv.config({
      path: nodeNameEnv,
    });
  }

  public getEnv(key: string) {
    return process.env[key] || "";
  }

  public getNumberEnv(key: string): number {
    return Number(this.getEnv(key));
  }

  public get nodeEnv(): string {
    return this.getEnv("NODE_ENV")?.trim() || "";
  }

  public createPathEnv(path: string): string {
    const arrEnv: Array<String> = ["env"];

    if (path.length > 0) {
      const stringToArray = path.split(".");
      arrEnv.unshift(...stringToArray);
    }

    return "." + arrEnv.join(".");
  }

  get initConnection(): Promise<DataSource> {
    return AppDataSource.initialize();
  }
}
