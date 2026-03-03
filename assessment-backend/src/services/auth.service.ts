import bcrypt from "bcryptjs";
import { User } from "../models/User";
import {
  RegisterInput,
  LoginInput,
  ChangePasswordInput,
} from "../validations/user.schema";
import { generateToken } from "../utils/jwt";

export class AuthService {
  static async register(data: RegisterInput) {
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new Error("Email is already registered");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await User.create({
      ...data,
      password: hashedPassword,
    });

    const token = generateToken({ id: user.id, role: user.role });

    return {
      user: this.excludePassword(user.toJSON()),
      token,
    };
  }

  static async login(data: LoginInput) {
    const user = await User.findOne({
      where: { email: data.email },
      attributes: ["id", "email", "password", "role"],
    });

    if (!user) {
      throw new Error("Account does not exist");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    await User.update({ lastLogin: new Date() }, { where: { id: user.id } });

    const token = generateToken({ id: user.id, role: user.role });

    return {
      status: "success",
      token,
      user: {
        email: user.email,
      },
    };
  }

  static async getMe(id: string) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return this.excludePassword(user.toJSON());
  }

  static async updateMe(id: string, data: any) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    await user.update(data);
    return this.excludePassword(user.toJSON());
  }

  static async changePassword(id: string, data: ChangePasswordInput) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(data.oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.newPassword, salt);

    await user.update({ password: hashedPassword });
    return { status: "success", message: "Password updated successfully" };
  }

  static excludePassword(user: any) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
