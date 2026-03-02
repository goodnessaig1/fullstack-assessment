import { Router } from "express";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/auth", authRoutes);

router.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "API is running successfully." });
});

export default router;
