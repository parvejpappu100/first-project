import { RequestHandler } from 'express';
import { StudentServices } from './student.service';

const getAllStudents: RequestHandler = async (req, res, next) => {
  try {
    const result = await StudentServices.getAllStudentsDataFromDB();

    // send response;
    res.status(200).json({
      success: true,
      message: 'Students are retrieve successfully.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent: RequestHandler = async (req, res, next) => {
  try {
    const studentId = req.params.studentID;

    const result = await StudentServices.getSingleStudentDataFromDB(studentId);

    // send response;
    res.status(200).json({
      success: true,
      message: 'Get single students successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// * to delete student data from db:
const deleteStudentData: RequestHandler = async (req, res, next) => {
  try {
    const studentID = req.params.studentID;
    const result = await StudentServices.deleteStudentFromDb(studentID);
    // send response;
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudentData,
};
