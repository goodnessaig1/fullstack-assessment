import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import uploadService from "../services/upload.service";

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const data = { ...req.body };

      if (req.file) {
        const uploadResult = await uploadService.uploadFile(
          req.file.buffer,
          req.file.originalname,
          req.file.mimetype,
        );
        data.profilePicture = uploadResult.url;
      }

      const result = await AuthService.register(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthService.login(req.body);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ status: "failure", error: error.message });
    }
  }

  static async getMe(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const user = await AuthService.getMe(userId);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  static async updateMe(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const data = { ...req.body };

      if (req.file) {
        const uploadResult = await uploadService.uploadFile(
          req.file.buffer,
          req.file.originalname,
          req.file.mimetype,
        );
        data.profilePicture = uploadResult.url;
      }

      const result = await AuthService.updateMe(userId, data);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
