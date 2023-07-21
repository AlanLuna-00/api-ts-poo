import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./user/user.router";
import { PurchaseRouter } from "./purchase/purchase.routes";
import { ProductRouter } from "./product/product.routes";
import { CustomerRouter } from "./customer/customer.routes";
import { CategoryRouter } from "./category/category.routes";
import { PurchaseProductRouter } from "./purchase/purchases_products.routes";
import { ConfigServer } from "./config/config";
import { DataSource } from "typeorm";
import { LoginStrategy } from "./auth/statregies/login.statregy";
import { JwtStrategy } from "./auth/statregies/jwt.statregy";
import { AuthRouter } from "./auth/auth.router";

class Server extends ConfigServer {
  public app: express.Application;
  private port: number = this.getNumberEnv("PORT");

  constructor() {
    super();
    this.app = express();
    this.middlewares();
    this.passportUse();
    this.dbConnection();
    this.app.use("/api", this.routes());
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
  }

  routes(): Array<express.Router> {
    return [
      new UserRouter().router,
      new PurchaseRouter().router,
      new ProductRouter().router,
      new CustomerRouter().router,
      new CategoryRouter().router,
      new PurchaseProductRouter().router,
      new AuthRouter().router,
    ];
  }

  passportUse() {
    return [new LoginStrategy().use, new JwtStrategy().use];
  }

  async dbConnection(): Promise<DataSource | void> {
    return this.initConnection
      .then(() => {
        console.log("Database connected");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port => ${this.port}`);
    });
  }
}

export default Server;
