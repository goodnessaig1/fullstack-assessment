import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { randomBytes } from "crypto";
import {
  UserRole,
  UserStatus,
  UserTitle,
  UserGender,
} from "../enums/user.enum";

export class User extends Model {
  public id!: string;
  public title!: UserTitle;
  public firstName!: string;
  public lastName!: string;
  public gender!: UserGender;
  public dateOfBirth!: Date;
  public role!: UserRole;
  public profilePicture!: string | null;
  public status!: UserStatus;
  public lastLogin!: Date | null;
  public password!: string;
  public email!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.STRING(12),
      primaryKey: true,
      defaultValue: () => randomBytes(6).toString("hex"),
    },
    title: {
      type: DataTypes.ENUM(...Object.values(UserTitle)),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM(...Object.values(UserGender)),
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(UserStatus)),
      allowNull: false,
      defaultValue: UserStatus.ACTIVE,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  },
);
