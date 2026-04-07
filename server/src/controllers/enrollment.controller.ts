import { Request, Response, NextFunction } from 'express';
import Enrollment from '../models/Enrollment';
import Course from '../models/Course';
import Module from '../models/Module';

export const getEnrollments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.user!.userId, status: 'active' })
      .populate({ path: 'courseId', populate: { path: 'instructorId', select: 'name profileImage' } });
    res.json({ enrollments });
  } catch (err) { next(err); }
};

export const enroll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) { res.status(404).json({ error: 'Course not found.' }); return; }

    const existing = await Enrollment.findOne({ studentId: req.user!.userId, courseId });
    if (existing) { res.status(409).json({ error: 'Already enrolled in this course.' }); return; }

    const enrolledCount = await Enrollment.countDocuments({ courseId });
    if (enrolledCount >= course.maxCapacity) { res.status(400).json({ error: 'Course is at full capacity.' }); return; }

    const enrollment = await Enrollment.create({ studentId: req.user!.userId, courseId, progress: 0 });
    res.status(201).json({ enrollment });
  } catch (err) { next(err); }
};

export const completeModule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const enrollment = await Enrollment.findOne({ _id: req.params.id, studentId: req.user!.userId });
    if (!enrollment) { res.status(404).json({ error: 'Enrollment not found.' }); return; }

    const { moduleId } = req.body;
    if (!enrollment.completedModules.includes(moduleId)) {
      enrollment.completedModules.push(moduleId);
    }

    const totalModules = await Module.countDocuments({ courseId: enrollment.courseId });
    enrollment.progress = totalModules > 0 ? Math.round((enrollment.completedModules.length / totalModules) * 100) : 0;

    if (enrollment.progress >= 100) enrollment.status = 'completed';
    await enrollment.save();

    res.json({ enrollment });
  } catch (err) { next(err); }
};
