import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { LeaveType, LeaveStatus } from "../enums/leave.enum";
import { User } from "./User";

export class LeaveRequest extends Model {
  public id!: string;
  public userId!: string;
  public leaveType!: LeaveType;
  public startDate!: Date;
  public endDate!: Date;
  public reason!: string;
  public status!: LeaveStatus;

  public reviewedByUserId!: string | null;
  public reviewReason!: string | null;
  public reviewedAt!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LeaveRequest.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING(12),
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    leaveType: {
      type: DataTypes.ENUM(...Object.values(LeaveType)),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(LeaveStatus)),
      allowNull: false,
      defaultValue: LeaveStatus.PENDING,
    },
    reviewedByUserId: {
      type: DataTypes.STRING(12),
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    reviewReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reviewedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "LeaveRequest",
    tableName: "leave_requests",
    timestamps: true,
  },
);

User.hasMany(LeaveRequest, { foreignKey: "userId", as: "leaveRequests" });
LeaveRequest.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(LeaveRequest, {
  foreignKey: "reviewedByUserId",
  as: "reviewedLeaves",
});
LeaveRequest.belongsTo(User, {
  foreignKey: "reviewedByUserId",
  as: "reviewer",
});
