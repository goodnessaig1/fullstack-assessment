import { User } from "../models/User";
import { LeaveRequest } from "../models/LeaveRequest";
import { LeaveType, LeaveStatus } from "../enums/leave.enum";
import { UserRole } from "../enums/user.enum";

export const generateDummyLeaves = async () => {
  try {
    const existingLeaves = await LeaveRequest.count();
    if (existingLeaves > 0) {
      console.log(
        "ℹ️ Leave requests already exist, skipping dummy data generation.",
      );
      return;
    }

    const teachers = await User.findAll({
      where: { role: UserRole.TEACHER },
      limit: 2,
    });
    const principal = await User.findOne({
      where: { role: UserRole.PRINCIPAL },
    });

    if (teachers.length === 0 || !principal) {
      console.log(
        "⚠️ Not enough users found to generate dummy leave requests.",
      );
      return;
    }

    const dummyLeaves = [
      {
        userId: teachers[0].id,
        leaveType: LeaveType.ANNUAL,
        startDate: new Date(new Date().setDate(new Date().getDate() + 10)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 15)),
        reason: "Taking my annual leave for a family vacation.",
        status: LeaveStatus.PENDING,
      },
      {
        userId: teachers[0].id,
        leaveType: LeaveType.SICK,
        startDate: new Date(new Date().setDate(new Date().getDate() - 5)),
        endDate: new Date(new Date().setDate(new Date().getDate() - 3)),
        reason: "Severe flu and fever.",
        status: LeaveStatus.APPROVED,
        reviewedByUserId: principal.id,
        reviewedAt: new Date(new Date().setDate(new Date().getDate() - 4)),
      },
      {
        userId: teachers[1] ? teachers[1].id : teachers[0].id,
        leaveType: LeaveType.MATERNITY,
        startDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 4)),
        reason: "Maternity leave scheduled according to doctor's advice.",
        status: LeaveStatus.APPROVED,
        reviewedByUserId: principal.id,
        reviewedAt: new Date(),
      },
    ];

    for (const leaveData of dummyLeaves) {
      await LeaveRequest.create(leaveData);
    }

    console.log("✅ Dummy leave requests generated successfully.");
  } catch (error) {
    console.error("❌ Failed to generate dummy leave requests:", error);
  }
};
