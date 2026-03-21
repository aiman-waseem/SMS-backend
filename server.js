import Fastify from "fastify";


// Import associations
import associations from "./config/associations.js";

const fastify = Fastify({
  logger: true,
  bodyLimit: 209715200, // 200 MB (200 * 1024 * 1024)
});
// customCorsCheck(fastify) //Backend Level
// corsPlugin(fastify) //Aditional Browsers origin check

//Fasifty Multer
import fastifyMultipart from "@fastify/multipart";
import { allRoutes } from "./route.js";
fastify.register(fastifyMultipart, {
  limits: {
    fileSize: 10 * 1024 * 1024, // optional: 10MB limit
  },
});
//PerHandler
// import { preValidRequest } from "./middleware/prevalidate.js";

// preValidRequest(fastify);


process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});



const prefix = process.env.PREFIX || "/api/v1";
fastify.register(allRoutes, { prefix });

const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';


// processCronJobs()
associations();

const startServer = async () => {
  try {
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("HOST:", host, "PORT:", port);
    console.log("Connecting to DB...", new Date().toISOString());

    // await sequelize.authenticate();
    console.log("✅ Database connection established");



    // Start Fastify server
    await fastify.listen({ port, host });
    console.log(`Server Started at http://${host}:${port}`);
  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
};
startServer();

