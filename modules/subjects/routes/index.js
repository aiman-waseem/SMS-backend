import fastify from "fastify"
import { getSubjectController } from "../subjectController.js"
import { createClassController } from "../../class/classController.js"

export const subjectRoutes = (fastify,options,done) => {
    fastify.route({
        method:["GET"],
        url:"/",
        handler:((req,reply)=>{
              getSubjectController(req,reply)
        })
    })

   
    done()
}