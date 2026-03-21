import { authRoutes } from "./modules/auth/routes/index.js";
import { classRoutes } from "./modules/class/route/index.js";
import { studentRoutes } from "./modules/students/routes/index.js";
import { subjectRoutes } from "./modules/subjects/routes/index.js";


export const allRoutes = (fastify, options, done) => {
  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(subjectRoutes, { prefix: "/subject" });
  fastify.register(classRoutes, { prefix: "/class" });
  fastify.register(studentRoutes, { prefix: "/students" });
  done()
}