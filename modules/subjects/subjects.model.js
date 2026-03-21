import { DataTypes } from "sequelize";
import sequelize from "../../config/DBconnection.js";



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

export default Subject;