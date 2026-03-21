import Class from "../modules/class/class.model.js";
import Subject from "../modules/subjects/subjects.model.js";
import ClassSubject from "../modules/class/classSubject.model.js";
import Student from "../modules/students/models/student.model.js";
import StudentEnrollment from "../modules/students/models/studentsEnrolment.model.js";

// Define associations
export default function associations() {
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
// -----------------------------------
Student.hasMany(StudentEnrollment, {
  foreignKey: "studentId",
  as: "enrollments"
  // as: "StudentEnrollments"
});

StudentEnrollment.belongsTo(Student, {
  foreignKey: "studentId",
  // as: "student"
});

Class.hasMany(StudentEnrollment, {
  foreignKey: "classId",
  as: "enrollments"
});

StudentEnrollment.belongsTo(Class, {
  foreignKey: "classId",
  as: "class"
});
}
