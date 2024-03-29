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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const user_router_1 = require("./user/user.router");
const config_1 = require("./config/config");
class Server extends config_1.ConfigServer {
    constructor() {
        super();
        this.port = this.getNumberEnv("PORT");
        this.app = (0, express_1.default)();
        this.middlewares();
        this.dbConnection();
        this.app.use("/api", this.routes());
    }
    middlewares() {
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)({
            origin: "*",
            methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
            allowedHeaders: ["Content-Type", "Authorization"],
        }));
    }
    routes() {
        return [new user_router_1.UserRouter().router];
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.initConnection
                .then(() => {
                console.log("Database connected");
            })
                .catch((err) => {
                console.error(err);
            });
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
exports.default = Server;
