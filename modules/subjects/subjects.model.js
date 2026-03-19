import { DataTypes } from "sequelize";
import sequelize from "../../config/DBconnection.js";
import Class from "../class/class.model.js";


const Subject = sequelize.define(
  "Subject",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    subjectName: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    tableName: "subjects",
    timestamps: true
  }
);
// Subject.belongsToMany(Class, {
//   through: ClassSubject,
//   foreignKey: "subjectId",
//   as: "classes"
// });

export default Subject;