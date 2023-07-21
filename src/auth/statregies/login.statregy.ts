import { AuthService } from "../services/auth.service";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { UserEntity } from "../../user/entities/user.entity";
import { PassportUse } from "../utils/passport.use";

const authService: AuthService = new AuthService();

export class LoginStrategy {
  async validate(
    email: string,
    password: string,
    done: any
  ): Promise<UserEntity> {
    const user = await authService.validateUser(email, password);
    if (!user) {
      return done(null, false, { message: "Invalid username or password" });
    }

    return done(null, user);
  }

  get use() {
    return PassportUse<LocalStrategy, Object, VerifyFunction>(
      "login",
      LocalStrategy,
      {
        emailField: "email",
        passwordField: "password",
      },
      this.validate
    );
  }
}
