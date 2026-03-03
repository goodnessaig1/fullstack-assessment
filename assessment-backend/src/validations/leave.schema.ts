import { z } from "zod";
import { LeaveType, LeaveStatus } from "../enums/leave.enum";

export const createLeaveSchema = z.object({
  leaveType: z.nativeEnum(LeaveType),
  startDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Invalid start date format, expected YYYY-MM-DD",
    ),
  endDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Invalid end date format, expected YYYY-MM-DD",
    ),
  reason: z.string().min(5, "Reason must be at least 5 characters long"),
});

export const respondLeaveSchema = z
  .object({
    status: z.enum([LeaveStatus.APPROVED, LeaveStatus.DECLINED]),
    reviewReason: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.status === LeaveStatus.DECLINED) {
        return !!data.reviewReason && data.reviewReason.trim().length >= 5;
      }
      return true;
    },
    {
      message: "Reason is required when declining a request (min 5 characters)",
      path: ["reviewReason"],
    },
  );
