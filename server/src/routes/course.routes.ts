import { Router } from 'express';
import { getCourses, getCourse, createCourse, updateCourse, deleteCourse, addModule, addAnnouncement, getInstructorCourses } from '../controllers/course.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

router.get('/', authenticate, getCourses);
router.get('/instructor/mine', authenticate, authorize('instructor'), getInstructorCourses);
router.get('/:idOrSlug', authenticate, getCourse);
router.post('/', authenticate, authorize('instructor'), createCourse);
router.put('/:id', authenticate, authorize('instructor'), updateCourse);
router.delete('/:id', authenticate, authorize('instructor'), deleteCourse);
router.post('/:id/modules', authenticate, authorize('instructor'), addModule);
router.post('/:id/announcements', authenticate, authorize('instructor'), addAnnouncement);

export default router;
