import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import StudentProfile from '../models/StudentProfile';
import InstructorProfile from '../models/InstructorProfile';
import { signToken } from '../utils/jwt';

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, studentId, department, year } = req.body;

    const existing = await User.findOne({ email });
    if (existing) { res.status(409).json({ error: 'An account with this email already exists.' }); return; }

    const user = await User.create({ name, email, passwordHash: password, role: 'student', profileImage: '' });
    await StudentProfile.create({
      userId: user._id,
      studentId: studentId || `STU-${Date.now()}`,
      department: department || 'Computer Science',
      year: year || 1,
    });

    const token = signToken({ userId: String(user._id), role: 'student', email: user.email });
    const userObj = { _id: user._id, name: user.name, email: user.email, role: user.role, profileImage: user.profileImage };
    res.status(201).json({ user: userObj, token });
  } catch (err) { next(err); }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) { res.status(404).json({ error: 'User not found.' }); return; }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) { res.status(401).json({ error: 'Invalid credentials.' }); return; }

    const token = signToken({ userId: String(user._id), role: user.role, email: user.email });
    const userObj = { _id: user._id, name: user.name, email: user.email, role: user.role, profileImage: user.profileImage };
    res.json({ user: userObj, token });
  } catch (err) { next(err); }
};

export const instructorSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, facultyId, department, specialization, bio } = req.body;

    const existing = await User.findOne({ email });
    if (existing) { res.status(409).json({ error: 'An account with this email already exists.' }); return; }

    const user = await User.create({ name, email, passwordHash: password, role: 'instructor', profileImage: '' });
    await InstructorProfile.create({
      userId: user._id,
      facultyId: facultyId || `FAC-${Date.now()}`,
      department: department || 'Computer Science',
      specialization: specialization || '',
      bio: bio || '',
    });

    const token = signToken({ userId: String(user._id), role: 'instructor', email: user.email });
    const userObj = { _id: user._id, name: user.name, email: user.email, role: user.role, profileImage: user.profileImage };
    res.status(201).json({ user: userObj, token });
  } catch (err) { next(err); }
};

export const instructorLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, role: 'instructor' }).select('+passwordHash');
    if (!user) { res.status(404).json({ error: 'Instructor account not found.' }); return; }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) { res.status(401).json({ error: 'Invalid credentials.' }); return; }

    const token = signToken({ userId: String(user._id), role: 'instructor', email: user.email });
    const userObj = { _id: user._id, name: user.name, email: user.email, role: user.role, profileImage: user.profileImage };
    res.json({ user: userObj, token });
  } catch (err) { next(err); }
};

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.user!.userId);
    if (!user) { res.status(404).json({ error: 'User not found.' }); return; }

    let profile: any = null;
    if (user.role === 'student') {
      profile = await StudentProfile.findOne({ userId: user._id });
    } else {
      profile = await InstructorProfile.findOne({ userId: user._id });
    }

    res.json({ user: { _id: user._id, name: user.name, email: user.email, role: user.role, profileImage: user.profileImage }, profile });
  } catch (err) { next(err); }
};
