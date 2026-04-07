import { Router } from 'express';
import { getResources, getResource, createResource, updateProgress, getSaved, saveResource, getRecentResources } from '../controllers/library.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

router.get('/', authenticate, getResources);
router.get('/recent', authenticate, authorize('student'), getRecentResources);
router.get('/saved', authenticate, authorize('student'), getSaved);
router.post('/saved', authenticate, authorize('student'), saveResource);
router.put('/progress', authenticate, authorize('student'), updateProgress);
router.get('/:idOrSlug', authenticate, getResource);
router.post('/', authenticate, authorize('instructor'), createResource);

export default router;
