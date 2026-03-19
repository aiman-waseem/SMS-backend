import { DataTypes } from "sequelize";


import Subject from "../subjects/subjects.model.js";
import sequelize from "../../config/DBconnection.js";
import Class from "./class.model.js";

const ClassSubject = sequelize.define(
  "ClassSubject",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: "class_subjects",
    timestamps: true
  }
);



// ClassSubject.belongsTo(Class, { foreignKey: 'classId' });
// ClassSubject.belongsTo(Subject, { foreignKey: 'subjectId' });

export default ClassSubject;

