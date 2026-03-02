import { z } from "zod";
import { UserRole, UserTitle, UserGender } from "../enums/user.enum";

export const registerSchema = z.object({
  title: z.nativeEnum(UserTitle),
  firstName: z.string().min(2, "firstName must be at least 2 characters"),
  lastName: z.string().min(2, "lastName must be at least 2 characters"),
  gender: z.nativeEnum(UserGender),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  role: z.nativeEnum(UserRole),
  profilePicture: z.string().url().optional().nullable(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
