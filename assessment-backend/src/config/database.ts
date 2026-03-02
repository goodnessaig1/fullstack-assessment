import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// We default to a local configuration if DATABASE_URL is not provided
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Often needed for Supabase/Neon
        },
      },
    })
  : new Sequelize({
      dialect: "sqlite",
      storage: "./database.sqlite", // Local fallback for development testing
      logging: false,
    });

export default sequelize;
