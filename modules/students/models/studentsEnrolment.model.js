import { DataTypes } from "sequelize";
import sequelize from "../../../config/DBconnection.js";


const StudentEnrollment = sequelize.define(
  "StudentEnrollment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
     rollNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sessionYear: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "student_enrollments",
    timestamps: false, // ❗ important (no updatedAt in table)
  }
);

export default StudentEnrollment;