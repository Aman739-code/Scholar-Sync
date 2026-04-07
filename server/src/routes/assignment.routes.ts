import { Router } from 'express';
import { getAssignments, getAssignment, createAssignment, updateAssignment, deleteAssignment } from '../controllers/assignment.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

router.get('/', authenticate, getAssignments);
router.get('/:idOrSlug', authenticate, getAssignment);
router.post('/', authenticate, authorize('instructor'), createAssignment);
router.put('/:id', authenticate, authorize('instructor'), updateAssignment);
router.delete('/:id', authenticate, authorize('instructor'), deleteAssignment);

export default router;
