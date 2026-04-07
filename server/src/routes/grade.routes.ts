import { Router } from 'express';
import { getGrades, getGPA, createGrade } from '../controllers/grade.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

router.get('/', authenticate, authorize('student'), getGrades);
router.get('/gpa', authenticate, authorize('student'), getGPA);
router.post('/', authenticate, authorize('instructor'), createGrade);

export default router;
