import { DataTypes } from "sequelize";
import sequelize from "../../config/DBconnection.js";
import ClassSubject from "./classSubject.model.js";
import Subject from "../subjects/subjects.model.js";


const Class = sequelize.define(
  "Class",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    className: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: "class",
    timestamps: true,
    freezeTableName: true
  }
  
);
// Class.belongsToMany(Subject, {
//   through: ClassSubject,
//   foreignKey: "classId",
//   as: "subjects"
// });


export default Class;