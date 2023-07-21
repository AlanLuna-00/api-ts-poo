import { SharedMiddleware } from "../shared/middlewares/shared.middleware";
import { BaseRoute } from "../shared/router/router";
import { AuthController } from "./controllers/auth.controller";

export class AuthRouter extends BaseRoute<AuthController, SharedMiddleware> {
  constructor() {
    super(AuthController, SharedMiddleware);
  }

  routes(): void {
    this.router.get("/logout", (req, res) => res.send("logout"));
    this.router.post("/login", this.middleware.passAuth("login"), (req, res) =>
      this.controller.login(req, res)
    );
  }
}
