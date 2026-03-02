import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import sequelize from "./config/database";
import routes from "./routes";
import { setupSwagger } from "./docs/swagger";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5001;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Setup Swagger Documentation
setupSwagger(app);

// API Routes
app.use("/api", routes);

// Handle 404 Not Found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// Start Server & Sync DB
const startServer = async () => {
  try {
    // Authenticate and sync Sequelize models
    await sequelize.authenticate();
    console.log(
      "✅ Connection to the database has been established successfully.",
    );

    // In production, use migrations instead of sync({ alter: true })
    await sequelize.sync({ alter: true });
    console.log("✅ All models were synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
