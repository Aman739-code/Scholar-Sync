import { Router } from 'express';
import { getStudentDashboard, getInstructorDashboard } from '../controllers/dashboard.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

router.get('/overview', authenticate, authorize('student'), getStudentDashboard);
router.get('/instructor', authenticate, authorize('instructor'), getInstructorDashboard);

export default router;
