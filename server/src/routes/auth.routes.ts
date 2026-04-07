import { Router } from 'express';
import { signup, login, instructorSignup, instructorLogin, getMe } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Student auth
router.post('/signup', signup);
router.post('/login', login);

// Instructor auth
router.post('/instructor/signup', instructorSignup);
router.post('/instructor/login', instructorLogin);

// Protected
router.get('/me', authenticate, getMe);

export default router;
