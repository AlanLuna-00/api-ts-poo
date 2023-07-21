import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HttpResponse } from "../../shared/response/http.response";

export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.findAll();
      if (users.length === 0) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, users);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      id === undefined ? this.httpResponse.NotFound(res, "Id not found") : null;
      const user = await this.userService.findUserWithRelation(id);
      if (!user) {
        return this.httpResponse.NotFound(res, "User not found");
      }
      return this.httpResponse.Ok(res, user);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async getUserWithRelationById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.userService.findUserWithRelation(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const data = req.body;
      if (!data) {
        return this.httpResponse.NotFound(res, "Data not found");
      }
      const user = await this.userService.createUser(data);
      return this.httpResponse.Ok(res, user);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      id === undefined ? this.httpResponse.NotFound(res, "Id not found") : null;
      const user = await this.userService.deleteUser(id);
      if (!user.affected) {
        return this.httpResponse.NotFound(res, "User not found");
      }
      return this.httpResponse.Ok(res, user);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      id === undefined ? this.httpResponse.NotFound(res, "Id not found") : null;
      const user = await this.userService.updateUser(id, req.body);
      if (!user.affected) {
        return this.httpResponse.NotFound(res, "User not found");
      }
      return this.httpResponse.Ok(res, user);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }
}
