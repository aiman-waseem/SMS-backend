import Class from "../modules/class/class.model.js";
import Subject from "../modules/subjects/subjects.model.js";
import ClassSubject from "../modules/class/classSubject.model.js";

// Define associations
Class.belongsToMany(Subject, {
  through: ClassSubject,
  foreignKey: "classId",
  as: "subjects"
});

Subject.belongsToMany(Class, {
  through: ClassSubject,
  foreignKey: "subjectId",
  as: "classes"
});

ClassSubject.belongsTo(Class, { foreignKey: "classId" });
ClassSubject.belongsTo(Subject, { foreignKey: "subjectId" });

export default {};