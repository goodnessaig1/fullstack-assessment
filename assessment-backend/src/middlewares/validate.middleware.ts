import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate =
  (schema: ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (req.body && typeof req.body === "object") {
        Object.keys(req.body).forEach((key) => {
          if (req.body[key] === "") {
            req.body[key] = undefined;
          }
        });
      }

      const validData = await schema.parseAsync(req.body);
      req.body = validData;
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const zodError = error as any;
        const formattedErrors = zodError.errors
          .map((err: any) => `${err.path.join(".")}: ${err.message}`)
          .join(", ");
        res.status(400).json({ error: formattedErrors });
      } else {
        res.status(400).json({ error: error.message || "Bad Request" });
      }
    }
  };
