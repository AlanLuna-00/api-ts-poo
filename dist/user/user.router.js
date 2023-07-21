"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const user_controller_1 = require("./controllers/user.controller");
const router_1 = require("../shared/router/router");
class UserRouter extends router_1.BaseRoute {
    constructor() {
        super(user_controller_1.UserController);
    }
    routes() {
        this.router.get("/users", (req, res) => this.controller.getUsers(req, res));
        this.router.get("/users/:id", (req, res) => this.controller.getUserById(req, res));
        this.router.post("/users", (req, res) => this.controller.createUser(req, res));
        this.router.delete("/users/:id", (req, res) => this.controller.deleteUser(req, res));
    }
}
exports.UserRouter = UserRouter;
