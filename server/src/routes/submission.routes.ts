import { Router } from 'express';
import { createSubmission, getSubmissions, getMySubmissions } from '../controllers/submission.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

router.post('/', authenticate, authorize('student'), createSubmission);
router.get('/', authenticate, authorize('instructor'), getSubmissions);
router.get('/my', authenticate, authorize('student'), getMySubmissions);

export default router;
