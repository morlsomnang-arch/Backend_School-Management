import { Student } from '../Element/Student.js'
import { Parent } from '../Element/Parent.js'
import { StudentParent } from '../Element/StudentParent.js'
import { TypeParent } from '../Element/TypeParent.js'
import { StudentAddress } from '../Element/StudentAddress.js'
import { StudentService } from '../Element/StudentService.js'
import { ClassClasstype } from '../Element/ClassClasstype.js'
import { Class } from '../Element/Class.js'
import { ClassType } from '../Element/ClassType.js'
import { AcademyYear } from '../Element/Academy_years.js'

/* =====================================================
   Parent ↔ TypeParent
===================================================== */
Parent.belongsTo(TypeParent, {
  foreignKey: 'type_parent_id',
  as: 'typeParent',
  onDelete: 'RESTRICT'
})

TypeParent.hasMany(Parent, {
  foreignKey: 'type_parent_id',
  as: 'parents'
})

/* =====================================================
   Student ↔ StudentParent ↔ Parent
===================================================== */
StudentParent.belongsTo(Student, {
  foreignKey: 'student_id',
  onDelete: 'CASCADE'
})

Student.hasMany(StudentParent, {
  foreignKey: 'student_id',
  onDelete: 'CASCADE'
})

StudentParent.belongsTo(Parent, {
  foreignKey: 'parent_id',
  onDelete: 'CASCADE'
})

Parent.hasMany(StudentParent, {
  foreignKey: 'parent_id',
  onDelete: 'CASCADE'
})

/* =====================================================
   Student ↔ StudentAddress
===================================================== */
StudentAddress.belongsTo(Student, {
  foreignKey: 'student_id',
  onDelete: 'CASCADE'
})

Student.hasMany(StudentAddress, {
  foreignKey: 'student_id',
  onDelete: 'CASCADE'
})

/* =====================================================
   Student ↔ StudentService ↔ AcademyYear
===================================================== */
StudentService.belongsTo(Student, {
  foreignKey: 'student_id',
  onDelete: 'CASCADE'
})

Student.hasMany(StudentService, {
  foreignKey: 'student_id',
  onDelete: 'CASCADE'
})

StudentService.belongsTo(AcademyYear, {
  foreignKey: 'academy_year_id',
  onDelete: 'RESTRICT'
})

AcademyYear.hasMany(StudentService, {
  foreignKey: 'academy_year_id',
  onDelete: 'RESTRICT'
})

/* =====================================================
   StudentService ↔ ClassClasstype
===================================================== */
StudentService.belongsTo(ClassClasstype, {
  foreignKey: 'class_classtype_id',
  onDelete: 'RESTRICT'
})

ClassClasstype.hasMany(StudentService, {
  foreignKey: 'class_classtype_id',
  onDelete: 'RESTRICT'
})

/* =====================================================
   ClassClasstype ↔ Class
===================================================== */
ClassClasstype.belongsTo(Class, {
  foreignKey: 'class_id',
  onDelete: 'CASCADE'
})

Class.hasMany(ClassClasstype, {
  foreignKey: 'class_id',
  onDelete: 'CASCADE'
})

/* =====================================================
   ClassClasstype ↔ ClassType
   ⚠️ column MUST be class_type_id
===================================================== */
ClassClasstype.belongsTo(ClassType, {
  foreignKey: 'classtype_id', // ✅
  onDelete: 'CASCADE'
})


ClassType.hasMany(ClassClasstype, {
  foreignKey: 'classtype_id' // ✅
})

/* =====================================================
   EXPORT ALL MODELS
===================================================== */
export {
  Student,
  Parent,
  StudentParent,
  TypeParent,
  StudentAddress,
  StudentService,
  ClassClasstype,
  Class,
  ClassType,
  AcademyYear
}
