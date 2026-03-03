import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import sequelize from "./config/database";
import { generateDummyLeaves } from "./utils/dummyData";
import routes from "./routes";
import { setupSwagger } from "./docs/swagger";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5001;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

setupSwagger(app);

app.use("/api", routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "✅ Connection to the database has been established successfully.",
    );

    await sequelize.sync({ alter: true });
    console.log("✅ All models were synchronized successfully.");

    await generateDummyLeaves();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
};

startServer();

const SELF_URL = "https://backend-assessment-uprm.onrender.com/";

setInterval(
  async () => {
    try {
      const res = await fetch(SELF_URL);
      if (res.ok) {
        console.log("Keep-alive ping successful ✅");
      } else {
        console.error("Keep-alive ping failed ❌", res.statusText);
      }
    } catch (err) {
      console.error("Keep-alive ping failed ❌");
    }
  },
  5 * 60 * 1000,
);
