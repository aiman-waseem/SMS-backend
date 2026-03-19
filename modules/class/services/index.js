import apiResponse from "../../../config/apiResponse.js";
import sequelize from "../../../config/DBconnection.js";
import Subject from "../../subjects/subjects.model.js";
import Class from "../class.model.js";
import ClassSubject from "../classSubject.model.js";

export const getClassService = async (req, reply) => {
    try {
        const {limit=10, offset=0, classId} = req.query;

       let whereClause = "";
        if (classId) {
            whereClause = `WHERE c.id = :classId`;
        }
        const response= await sequelize.query(
            `SELECT 
    c.id,
    c.className,
    COALESCE(JSON_ARRAYAGG(s.subjectName), JSON_ARRAY()) AS subjects,
    COUNT(*) OVER() AS total_count
FROM class c
LEFT JOIN class_subjects cs ON c.id = cs.classId
LEFT JOIN subjects s ON cs.subjectId = s.id
${whereClause}
GROUP BY c.id, c.className

LIMIT :limit OFFSET :offset;`,
            {
                replacements: {
                    limit: Number(limit),
                    offset: Number(offset),
                    classId: classId
                },
             type: sequelize.QueryTypes.SELECT

            }
        );
        // const res2 = Class.findAll({
        //     limit: Number(limit),
        //     offset: Number(offset),
        //     include: [
        //       {
        //         model: ClassSubject,
        //         include: [{
        //           model: Subject
        //         }]
        //       }
        //     ]
        //   });

      
        return response;
    } catch (error) {
        throw error;
    }
}

// export const createClassService = async (req, reply) => {
//     try {
//         const { className, subjectIds } = req.body;
//         // const [newClass] = await sequelize.query(
//         //     `INSERT INTO class (className) VALUES (:className) RETURNING id;`,
//         //     {
//         //         replacements: { className },
//         //         type: sequelize.QueryTypes.INSERT
//         //     }
//         // );
//     const findClass = await Class.findOne({ where: { className } });
//     if (findClass) {
//     //   throw new Error("Class with the same name already exists");
//       return reply.status(400).send(apiResponse("Failure", false, 400, "Class with the same name already exists!", {}));    
//     }
    
//         const newClass = await Class.create({
// className
// });
//  console.log("Class Query New Class", newClass)
//  // 2️⃣ Prepare mapping data
//     const classSubjectData = subjectIds.map((subjectId) => ({
//       classId: newClass.id,
//       subjectId: subjectId
//     }));

//     // 3️⃣ Insert into classSubjects table
//     await ClassSubject.bulkCreate(classSubjectData);
// // return newClass;
//     } catch (error) {
//         throw error;
//     }
// }



export const createClassService = async (req, reply) => {
  const transaction = await sequelize.transaction();

  try {
    const { className, subjectIds } = req.body;

    const findClass = await Class.findOne({ 
      where: { className },
      transaction
    });

    if (findClass) {
      await transaction.rollback();
      return reply.status(400).send(
        apiResponse(
          "Failure",
          false,
          400,
          "Class with the same name already exists!",
          {}
        )
      );
    }

    // 1️⃣ create class
    const newClass = await Class.create(
      { className },
      { transaction }
    );

    // 2️⃣ prepare mapping
    const classSubjectData = subjectIds.map((subjectId) => ({
      classId: newClass.id,
      subjectId
    }));

    // 3️⃣ insert mapping
    await ClassSubject.bulkCreate(classSubjectData, { transaction });

    // 4️⃣ commit transaction
    await transaction.commit();

    return reply.send(
      apiResponse(
        "Success",
        true,
        201,
        "Class created successfully",
        newClass
      )
    );

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};