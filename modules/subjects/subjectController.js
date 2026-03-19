import apiResponse from "../../config/apiResponse.js"
import { subjectService } from "./services/subject.services.js"

export const getSubjectController = async (req,rep)=>{
    try {
        const subjects = await subjectService(req,rep)
        return rep.status(200).send(apiResponse("Success", true, 200, "Subjects retrieved successfully", subjects))
    } catch (error) {
        return rep.status(500).send(apiResponse("Error", false, 500, "Error occurred while fetching subjects", null))
    }
}
