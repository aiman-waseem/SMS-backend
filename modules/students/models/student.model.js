import { DataTypes } from "sequelize";
import sequelize from "../../../config/DBconnection.js";

const Student = sequelize.define(
  "Student",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    std_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    rollNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    admissionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "students",
    timestamps: true, // automatically handles createdAt & updatedAt
  }
);

export default Student;