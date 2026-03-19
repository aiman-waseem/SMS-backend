import sequelize from "../../../config/DBconnection.js";

export const subjectService = async (req) => {
    try {
        console.log("object")
           const { limit = 10, offset = 0 } = req.query;

    const [response] = await sequelize.query(
      `SELECT id, subjectName, COUNT(id) OVER() as total_count from subjects s
       ORDER BY subjectName limit :limit offset :offset;`,
      {
        replacements: {
          limit: Number(limit),
          offset: Number(offset),
        },
      }
    );
    const data = response.map(({ total_count, ...rest }) => rest);
return{
    data,
   count: response[0]?.total_count || 0,

}
     
        
    } catch (error) {
        console.log("ERROR", error)
    }
}