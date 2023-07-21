"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const http_response_1 = require("../../shared/response/http.response");
class UserController {
    constructor(userService = new user_service_1.UserService(), httpResponse = new http_response_1.HttpResponse()) {
        this.userService = userService;
        this.httpResponse = httpResponse;
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.findAll();
                if (users.length === 0) {
                    return this.httpResponse.NotFound(res, "No existe dato");
                }
                return this.httpResponse.Ok(res, users);
            }
            catch (error) {
                return this.httpResponse.Error(res, error);
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                id === undefined ? this.httpResponse.NotFound(res, "Id not found") : null;
                const user = yield this.userService.findById(id);
                if (!user) {
                    return this.httpResponse.NotFound(res, "User not found");
                }
                return this.httpResponse.Ok(res, user);
            }
            catch (error) {
                return this.httpResponse.Error(res, error);
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                if (!data) {
                    return this.httpResponse.NotFound(res, "Data not found");
                }
                const user = yield this.userService.createUser(data);
                return this.httpResponse.Ok(res, user);
            }
            catch (error) {
                return this.httpResponse.Error(res, error);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                id === undefined ? this.httpResponse.NotFound(res, "Id not found") : null;
                const user = yield this.userService.deleteUser(id);
                if (!user.affected) {
                    return this.httpResponse.NotFound(res, "User not found");
                }
                return this.httpResponse.Ok(res, user);
            }
            catch (error) {
                return this.httpResponse.Error(res, error);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                id === undefined ? this.httpResponse.NotFound(res, "Id not found") : null;
                const user = yield this.userService.updateUser(id, req.body);
                if (!user.affected) {
                    return this.httpResponse.NotFound(res, "User not found");
                }
                return this.httpResponse.Ok(res, user);
            }
            catch (error) {
                return this.httpResponse.Error(res, error);
            }
        });
    }
}
exports.UserController = UserController;
