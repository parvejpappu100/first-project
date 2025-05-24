import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// * That will call controller function:
router.get('/', StudentController.getAllStudents);
router.get('/:studentID', StudentController.getSingleStudent);
router.delete('/:studentID', StudentController.deleteStudentData);

export const StudentsRoutes = router;
