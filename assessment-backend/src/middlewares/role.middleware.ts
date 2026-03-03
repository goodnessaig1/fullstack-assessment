import { Request, Response, NextFunction } from "express";
import { UserRole } from "../enums/user.enum";

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = (req as any).user?.role;

    if (!userRole) {
      res.status(401).json({ error: "Unauthorized. User object not found." });
      return;
    }

    if (!allowedRoles.includes(userRole)) {
      res
        .status(403)
        .json({
          error: `Forbidden. Requires role: ${allowedRoles.join(", ")}`,
        });
      return;
    }

    next();
  };
};
