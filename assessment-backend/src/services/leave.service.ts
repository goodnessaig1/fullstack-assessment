import { LeaveRequest } from "../models/LeaveRequest";
import { User } from "../models/User";
import { LeaveStatus, LeaveType } from "../enums/leave.enum";

export class LeaveService {
  /**
   * Fetch all leave requests. Usually accessed by Principal/Admin.
   */
  static async getAllRequests(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await LeaveRequest.findAndCountAll({
      limit,
      offset,
      distinct: true,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "role"],
        },
        {
          model: User,
          as: "reviewer",
          attributes: ["id", "firstName", "lastName", "role"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return {
      data: rows,
      meta: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit,
      },
    };
  }

  /**
   * Fetch leave requests belonging to a specific user.
   */
  static async getUserRequests(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const offset = (page - 1) * limit;
    const { count, rows } = await LeaveRequest.findAndCountAll({
      where: { userId },
      limit,
      offset,
      distinct: true,
      include: [
        {
          model: User,
          as: "reviewer",
          attributes: ["id", "firstName", "lastName", "role"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return {
      data: rows,
      meta: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit,
      },
    };
  }

  /**
   * Create a new leave request.
   */
  static async createRequest(
    userId: string,
    data: {
      leaveType: LeaveType;
      startDate: string;
      endDate: string;
      reason: string;
    },
  ) {
    if (new Date(data.endDate) < new Date(data.startDate)) {
      throw new Error("End date cannot be earlier than start date");
    }

    const leave = await LeaveRequest.create({
      userId,
      ...data,
      status: LeaveStatus.PENDING,
    });

    return leave;
  }

  /**
   * Approve or decline a leave request (Admin/Principal only).
   */
  static async respondToRequest(
    leaveId: string,
    reviewerId: string,
    status: LeaveStatus.APPROVED | LeaveStatus.DECLINED,
    reviewReason?: string,
  ) {
    const leave = await LeaveRequest.findByPk(leaveId);
    if (!leave) {
      throw new Error("Leave request not found");
    }

    if (leave.status !== LeaveStatus.PENDING) {
      throw new Error(
        `Cannot modify request because it is already ${leave.status}`,
      );
    }

    leave.status = status;
    leave.reviewedByUserId = reviewerId;
    leave.reviewedAt = new Date();

    if (reviewReason) {
      leave.reviewReason = reviewReason;
    }

    await leave.save();
    return leave;
  }
}
