import { createClassController, getClassController } from "../classController.js"

export const classRoutes = (fastify, options, done) => {
  fastify.route(
    {
        method: ["GET"],
        url: "/",
        handler: ((req, reply) => {
            getClassController(req, reply)
        })
    }
  )
   fastify.route({
        method:["POST"],
        url:"/",
        handler:((req,reply)=>{
            createClassController(req,reply)
        })  
 })
  done()
}