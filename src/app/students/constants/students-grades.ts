import { IStudentGrades } from '../models/user.interface';

export const STUDENTS_GRADES = Object.keys(IStudentGrades).filter((grade) => {
  return !(parseInt(grade) >= 0);
});
