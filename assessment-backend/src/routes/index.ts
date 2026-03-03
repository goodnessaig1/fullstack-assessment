import { Router } from "express";
import authRoutes from "./auth.routes";
import leaveRoutes from "./leave.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/leave", leaveRoutes);

router.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "API is running successfully." });
});

export default router;
