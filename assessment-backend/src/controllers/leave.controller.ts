import { Request, Response } from "express";
import { LeaveService } from "../services/leave.service";
import { UserRole } from "../enums/user.enum";

export class LeaveController {
  static async getMyLeaves(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const leaves = await LeaveService.getUserRequests(userId);
      res.status(200).json({ status: "success", data: leaves });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllLeaves(req: Request, res: Response): Promise<void> {
    try {
      const leaves = await LeaveService.getAllRequests();
      res.status(200).json({ status: "success", data: leaves });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async submitLeave(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const result = await LeaveService.createRequest(userId, req.body);
      res.status(201).json({ status: "success", data: result });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async respondToLeave(req: Request, res: Response): Promise<void> {
    try {
      const reviewerId = (req as any).user.id;
      const id = req.params.id as string;
      const { status, reviewReason } = req.body;

      const result = await LeaveService.respondToRequest(
        id,
        reviewerId,
        status,
        reviewReason,
      );
      res.status(200).json({ status: "success", data: result });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
