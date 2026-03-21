import { createStudents, getStudents } from "../controllers/index.js";

export const studentRoutes = (fastify, options, done) => {
    // Define student-related routes here
    // Example: fastify.route({ method: 'GET', url: '/', handler: getStudentsController })
    fastify.route({
        method:"POST",
        url:"/enroll",
        handler: ((req,reply)=>{
            createStudents(req, reply)
        })
    })
    fastify.route({
        method:"GET",
        url:"/",
        handler: ((req,reply)=>{
            getStudents(req, reply)
        })
    })

    done();
}