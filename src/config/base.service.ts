import { ConfigServer } from "./config";
import { BaseEntity } from "./base.entity";
import { Repository, EntityTarget } from "typeorm";
export class BaseService<T extends BaseEntity> extends ConfigServer {
  public execRepository: Promise<Repository<T>>;

  constructor(private getEntity: EntityTarget<T>) {
    super();
    this.execRepository = this.initRepository(getEntity);
  }

  async initRepository(entity: EntityTarget<T>): Promise<Repository<T>> {
    const connection = await this.initConnection;
    return connection.getRepository(entity);
  }
}
