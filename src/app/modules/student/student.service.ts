
import {Student} from './student.model';



const getAllStudentsDataFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentDataFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

// * Delete student from db:
const deleteStudentFromDb = async (id:string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsDataFromDB,
  getSingleStudentDataFromDB,
  deleteStudentFromDb,
};
