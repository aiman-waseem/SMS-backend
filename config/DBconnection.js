// config/DBContext.js
// import chalk from "chalk";
import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fs from "fs";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🧩 Load environment file dynamically
const rawEnv = process.env.NODE_ENV?.trim() || "development";
const envFile = `.env.${rawEnv}`;
const envPath = path.join(__dirname, "../", envFile);

// Load .env file if exists
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log(chalk.cyan(`🌱 Loaded environment from: ${envFile}`));
} else {
  console.warn(chalk.yellow(`⚠️ Env file not found: ${envFile}`));
}

console.log("object", process.env.DATABASE_URL)

// Fallback: if no env-specific file was loaded, try plain .env
const defaultEnvPath = path.join(__dirname, "../.env");
if (!process.env.DATABASE_URL && fs.existsSync(defaultEnvPath)) {
  dotenv.config({ path: defaultEnvPath });
  console.log(chalk.cyan("🌱 Loaded fallback environment from: .env"));
}
// 🧠 Factory: create new Sequelize instance
export const createSequelizeInstance = () =>
  new Sequelize(process.env.DATABASE_URL, {
    dialect: "mysql",
    // logging:
    //   process.env.NODE_ENV === "development" ||
    //   process.env.NODE_ENV === "dev",
     logging:
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "dev"
        ? console.log // use console.log when in dev
        : false,       // disable logging in prod
    pool: {
      max: 5,
      min: 2,
      acquire: 60000,
      idle: 10000
    },
    retry: {
      max: 3,
      backoffBase: 1000,
    },
  });

// 🔗 Global instance
export let sequelize = createSequelizeInstance();

// 🩺 Try initial connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log(chalk.blue("✅ DB connection established successfully."));
  } catch (error) {
    console.log("ERROR",error)
    console.log(chalk.red("❌ Initial DB connection failed:"), error.message);
  }
})();

// ♻️ Global reconnection handler
export const reconnectSequelize = async () => {
  try {
    console.log(chalk.yellow("⚙️ Reinitializing Sequelize..."));
    const newSequelize = createSequelizeInstance();
    await newSequelize.authenticate();

    // Update global reference
    sequelize = newSequelize;

    console.log(chalk.green("✅ DB reconnected successfully (global instance)."));
    return sequelize;
  } catch (error) {
    console.error(chalk.red("❌ Failed to reconnect Sequelize:"), error.message);
    throw error;
  }
};

// 🧩 Default export for compatibility
export default sequelize;
