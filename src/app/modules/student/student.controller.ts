import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);

    // send response;
    res.status(200).json({
      success: true,
      message: 'Student is created successfully.',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsDataFromDB();

    // send response;
    res.status(200).json({
      success: true,
      message: 'Students are retrieve successfully.',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentID;

    const result = await StudentServices.getSingleStudentDataFromDB(studentId);

    // send response;
    res.status(200).json({
      success: true,
      message: 'Get single students successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
