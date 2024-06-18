
import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';



import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from '../student/ZodstudentValidation';

const router = express.Router()


router.post('/createStudent', validateRequest(studentValidations.createValidationSchema), UserControllers.createStudent)


export const UserRoutes = router