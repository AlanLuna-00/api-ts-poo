"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRoute = void 0;
const express_1 = require("express");
class BaseRoute {
    //   public middlewares: U
    constructor(TController) {
        this.router = (0, express_1.Router)();
        this.controller = new TController();
        this.routes();
    }
    routes() { }
}
exports.BaseRoute = BaseRoute;
