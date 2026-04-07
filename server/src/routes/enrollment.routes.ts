import { Router } from 'express';
import { getEnrollments, enroll, completeModule } from '../controllers/enrollment.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

router.get('/', authenticate, authorize('student'), getEnrollments);
router.post('/', authenticate, authorize('student'), enroll);
router.put('/:id/module-complete', authenticate, authorize('student'), completeModule);

export default router;
