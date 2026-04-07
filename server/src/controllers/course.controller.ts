import { Request, Response, NextFunction } from 'express';
import Course from '../models/Course';
import Module from '../models/Module';
import Announcement from '../models/Announcement';
import Enrollment from '../models/Enrollment';

export const getCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { track, search, semester } = req.query;
    const filter: any = {};
    if (track && track !== 'All Tracks') filter.track = track;
    if (semester) filter.semester = semester;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const courses = await Course.find(filter).populate('instructorId', 'name profileImage').sort({ createdAt: -1 });

    // If user is a student, attach enrollment info
    if (req.user && req.user.role === 'student') {
      const enrollments = await Enrollment.find({ studentId: req.user.userId });
      const enrollmentMap = new Map(enrollments.map(e => [e.courseId.toString(), e]));
      const coursesWithEnrollment = courses.map(c => {
        const enrollment = enrollmentMap.get((c._id as any).toString());
        return { ...c.toObject(), enrollment: enrollment || null };
      });
      res.json({ courses: coursesWithEnrollment });
      return;
    }

    res.json({ courses });
  } catch (err) { next(err); }
};

export const getCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { idOrSlug } = req.params;
    let course = await Course.findOne({ slug: idOrSlug }).populate('instructorId', 'name profileImage');
    if (!course) course = await Course.findById(idOrSlug).populate('instructorId', 'name profileImage').catch(() => null);
    if (!course) { res.status(404).json({ error: 'Course not found.' }); return; }

    const modules = await Module.find({ courseId: course._id }).sort({ orderIndex: 1 });
    const announcements = await Announcement.find({ courseId: course._id }).populate('postedBy', 'name').sort({ postedDate: -1 });

    let enrollment = null;
    if (req.user && req.user.role === 'student') {
      enrollment = await Enrollment.findOne({ studentId: req.user.userId, courseId: course._id });
    }

    const enrolledCount = await Enrollment.countDocuments({ courseId: course._id });

    res.json({ course, modules, announcements, enrollment, enrolledCount });
  } catch (err) { next(err); }
};

export const createCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const course = await Course.create({ ...req.body, slug, instructorId: req.user!.userId });
    res.status(201).json({ course });
  } catch (err) { next(err); }
};

export const updateCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, instructorId: req.user!.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!course) { res.status(404).json({ error: 'Course not found or unauthorized.' }); return; }
    res.json({ course });
  } catch (err) { next(err); }
};

export const deleteCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const course = await Course.findOneAndDelete({ _id: req.params.id, instructorId: req.user!.userId });
    if (!course) { res.status(404).json({ error: 'Course not found or unauthorized.' }); return; }
    await Module.deleteMany({ courseId: course._id });
    await Announcement.deleteMany({ courseId: course._id });
    await Enrollment.deleteMany({ courseId: course._id });
    res.json({ message: 'Course deleted successfully.' });
  } catch (err) { next(err); }
};

export const addModule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const course = await Course.findOne({ _id: req.params.id, instructorId: req.user!.userId });
    if (!course) { res.status(404).json({ error: 'Course not found or unauthorized.' }); return; }

    const count = await Module.countDocuments({ courseId: course._id });
    const mod = await Module.create({ ...req.body, courseId: course._id, orderIndex: req.body.orderIndex || count + 1 });
    res.status(201).json({ module: mod });
  } catch (err) { next(err); }
};

export const addAnnouncement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const course = await Course.findOne({ _id: req.params.id, instructorId: req.user!.userId });
    if (!course) { res.status(404).json({ error: 'Course not found or unauthorized.' }); return; }

    const announcement = await Announcement.create({ courseId: course._id, postedBy: req.user!.userId, text: req.body.text });
    res.status(201).json({ announcement });
  } catch (err) { next(err); }
};

export const getInstructorCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const courses = await Course.find({ instructorId: req.user!.userId }).sort({ createdAt: -1 });
    const coursesWithStats = await Promise.all(courses.map(async (c) => {
      const enrolledCount = await Enrollment.countDocuments({ courseId: c._id });
      const moduleCount = await Module.countDocuments({ courseId: c._id });
      return { ...c.toObject(), enrolledCount, moduleCount };
    }));
    res.json({ courses: coursesWithStats });
  } catch (err) { next(err); }
};
