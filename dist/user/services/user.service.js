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
exports.UserService = void 0;
const base_service_1 = require("../../config/base.service");
const user_entity_1 = require("../entities/user.entity");
class UserService extends base_service_1.BaseService {
    constructor() {
        super(user_entity_1.UserEntity);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.execRepository;
            return repository.find();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.execRepository;
            return repository.findOneBy({ id });
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.execRepository;
            return repository.save(user);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.execRepository;
            return repository.delete({ id });
        });
    }
    updateUser(id, userUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield this.execRepository;
            return repository.update({ id }, userUpdate);
        });
    }
}
exports.UserService = UserService;
