import apiResponse from "../../config/apiResponse.js";
import { createClassService, getClassService } from "./services/index.js";


export const getClassController = async (req, reply) => {
    try {
        const response = await getClassService(req, reply)
        return reply.status(200).send(apiResponse("Success", true, 200, "Class retrieved successfully!", response));
        
    } catch (error) {
        console.log("ERROR", error)
        return reply.status(500).send(apiResponse("Error", false, 500, "Error occurred while fetching class", error));
    }
}

export const createClassController = async (req, reply) => {
    try {
        const newClass = await createClassService(req, reply);
        return reply.status(201).send(apiResponse("Success", true, 200, "Class created successfully!", newClass));
    } catch (error) {
        console.log("ERROR", error)
        return reply.status(500).send(apiResponse("Error", false, 500, "Error occurred while creating class", error));
    }
}