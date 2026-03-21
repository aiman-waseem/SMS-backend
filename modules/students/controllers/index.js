import { Op } from "sequelize";
import apiResponse from "../../../config/apiResponse.js";
import sequelize from "../../../config/DBconnection.js";
import { returnPayloadHeaders } from "../../../utils/index.js";
import Class from "../../class/class.model.js";
import Student from "../models/student.model.js";
import StudentEnrollment from "../models/studentsEnrolment.model.js";

export const createStudents = async (req, reply) => {
    const { payload } = await returnPayloadHeaders(req);
    const { name,  classId, admissionDate, rollNo } = payload;
    console.log("REQUEST pay", req)
  const t = await sequelize.transaction();

    try {
        const newStudent = await Student.create({
            std_name: name,
            //  userId: req.user.id,
            userId:36,
            admissionDate,
            rollNo
        }, {transaction: t})
        await StudentEnrollment.create({
            studentId: newStudent.id,
            rollNo,
            classId,
            sessionYear: new Date().getFullYear().toString() || "2026-2027"
        },{transaction: t})
        await t.commit()
        // return newStudent;
        return reply.send(
            apiResponse(
              "Success",
              true,
              201,
              "Student created successfully!",
              newStudent
            )
          );
    } catch (error) {
        await t.rollback()
        console.error("Error creating student:", error);
        return reply.status(500).send(
            apiResponse(
              "Error",
              false,
              500,
              "Failed to create student.",
              error
            )
          );
    }
}

export const getStudents = async (req, reply) => {
    
    try {
        const {limit=10,offset=0,name,classId} = req.query;

        const whereClause = {
            [Op.and]:[
                name ? { std_name: { [Op.like]: `%${name}%` } } : false,
                // classId ? { '$enrollments.classId$': classId } : false
            ].filter(Boolean)
        };

        // const {rows,count} = await Student.findAndCountAll({
        //     limit: Number(limit),
        //     offset: Number(offset),
        //     distinct: true,
        //     where: whereClause,
        //     include:[
        //         {
        //             model: StudentEnrollment,
        //             as: "enrollments",
        //             attributes: ["classId", "sessionYear", "rollNo"],
        //             // attributes:[],
        //             include:[
        //                 {
        //                     model: Class,
        //                     as: "class",
        //                     attributes: ["className", "id"]
        //                 }]
        //         }
        //     ]
        // })
        const { rows, count } = await Student.findAndCountAll({
  limit: Number(limit),
  offset: Number(offset),
  distinct: true,
  where: whereClause,
  include: [
    {
      model: StudentEnrollment,
      as: "enrollments",
    //   attributes: [], // hide all enrollment fields
       where: classId ? { classId } : undefined, // filter by classId here
      include: [
        {
          model: Class,
          as: "class",
          attributes: ["className"] // only className
        }
      ]
    }
  ]
});
        return reply.send(
            apiResponse(
              "Success",
              true,
              200,
              "Students retrieved successfully!",
              { data:rows, count }
            )
          );
    } catch (error) {
        console.error("Error fetching students:", error);
        return reply.status(500).send(
            apiResponse(
              "Error",
              false,
              500,
              "Failed to fetch students.",
              error
            )
          );
    }
}