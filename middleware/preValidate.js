const insecureRoutes = [
  "/api/v1/auth/login"]

export function preValidRequest(fastify) {
  fastify.addHook("preHandler", async (request, reply) => {
      const url = request.url?.split("?")[0];
    const ip = request?.ip;
    const method = request.method;
    console.log(chalk.dim(`[REQ] ${method} ${url} from ${ip}`));


     const authHeader = request.headers.authorization;
      const authToken = authHeader?.toLowerCase()?.startsWith("bearer ") ? authHeader.split(" ")[1] : null;
      if (!authToken) {
        return reply
          .status(401)
          .send(apiResponse("Failure", false, 401, "Please provide authorization token ", null));
      }
    //   await ensureDBConnection();
      await authenticate(request, reply, authToken);
      if (reply.sent) return;
    //   await authorize(request, reply, method);
  })
}