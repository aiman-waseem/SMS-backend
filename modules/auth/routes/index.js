import { login } from "../controllers/index.js";


export const authRoutes = (fastify, options, done) => {
//     fastify.get("/", async () => {
//   return { status: "Backend is running" };
// });
fastify.post("/login", login);
done()
//   fastify.route({
//     method: ["POST"],
//     url: "/login",
//     handler: (req, reply) => {
//       if (req.method == "POST") {
//         login(req, reply)
//       }
//     },
//   })
}