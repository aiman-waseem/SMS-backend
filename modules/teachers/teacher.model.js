import { DataTypes } from "sequelize";
import sequelize from "../../config/DBconnection.js";
import Subject from "../subjects/subjects.model.js";

const Teacher = sequelize.define(
  "Teacher",
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
    teacher_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    joiningDate: {
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
    tableName: "teachers",
    timestamps: true, // handles createdAt & updatedAt automatically
  }


);
  Teacher.belongsTo(Subject, {
  foreignKey: "teacherId",
  as: "teacherId",
});
// TempInvoiceItem.belongsTo(TempInvoice, {
//   foreignKey: "invoiceId",
//   as: "tempInvoice",
// });
export default Teacher;