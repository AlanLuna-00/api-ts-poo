import { BaseService } from "../../config/base.service";
import { UserEntity } from "../entities/user.entity";
import { RoleType, UserDTO } from "../dto/user.dto";
import { DeleteResult, UpdateResult } from "typeorm";
import * as bcrypt from "bcrypt";

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async findAll(): Promise<UserEntity[]> {
    const repository = await this.execRepository;
    return repository.find();
  }

  async findById(id: string): Promise<UserEntity | null> {
    const repository = await this.execRepository;
    return repository.findOneBy({ id });
  }

  async findUserWithRelation(id: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.customer", "customer")
      .where({ id })
      .getOne();
  }

  async findUserByRole(id: string, role: RoleType): Promise<UserEntity | null> {
    const repository = await this.execRepository;
    const user = repository
      .createQueryBuilder("user")
      .where({ id })
      .andWhere({ role })
      .getOne();
    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const repository = await this.execRepository;
    const user = repository
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where({ email })
      .getOne();
    return user;
  }

  async findUserByLastName(lastName: string): Promise<UserEntity | null> {
    const repository = await this.execRepository;
    return repository.findOneBy({ lastName });
  }

  async createUser(user: UserDTO): Promise<UserEntity> {
    const repository = await this.execRepository;
    const newUser = repository.create(user);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    return repository.save(newUser);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    const repository = await this.execRepository;
    return repository.delete({ id });
  }

  async updateUser(id: string, userUpdate: UserDTO): Promise<UpdateResult> {
    const repository = await this.execRepository;
    return repository.update({ id }, userUpdate);
  }
}
