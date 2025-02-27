import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// * That will call controller function:
router.post('/create-student', StudentController.createStudent);
router.get('/', StudentController.getAllStudents);
router.get('/:studentID', StudentController.getSingleStudent);

export const StudentsRoutes = router;
