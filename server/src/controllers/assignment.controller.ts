import { Request, Response, NextFunction } from 'express';
import Assignment from '../models/Assignment';
import Submission from '../models/Submission';
import Enrollment from '../models/Enrollment';

export const getAssignments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { courseId, status } = req.query;
    const filter: any = {};
    if (courseId) filter.courseId = courseId;

    // For students, only show assignments from enrolled courses
    if (req.user!.role === 'student') {
      const enrollments = await Enrollment.find({ studentId: req.user!.userId, status: 'active' });
      const courseIds = enrollments.map(e => e.courseId);
      filter.courseId = { $in: courseIds };
    }

    // For instructors, show assignments for their courses if no courseId filter
    if (req.user!.role === 'instructor' && !courseId) {
      const Course = (await import('../models/Course')).default;
      const courses = await Course.find({ instructorId: req.user!.userId });
      filter.courseId = { $in: courses.map(c => c._id) };
    }

    const assignments = await Assignment.find(filter).populate('courseId', 'title code slug').sort({ deadline: 1 });

    // For students, attach submission status
    if (req.user!.role === 'student') {
      const submissions = await Submission.find({ studentId: req.user!.userId, assignmentId: { $in: assignments.map(a => a._id) } });
      const submissionMap = new Map(submissions.map(s => [s.assignmentId.toString(), s]));
      const assignmentsWithStatus = assignments.map(a => ({
        ...a.toObject(),
        submission: submissionMap.get((a._id as any).toString()) || null,
      }));
      res.json({ assignments: assignmentsWithStatus });
      return;
    }

    res.json({ assignments });
  } catch (err) { next(err); }
};

export const getAssignment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { idOrSlug } = req.params;
    let assignment = await Assignment.findOne({ slug: idOrSlug }).populate('courseId', 'title code slug');
    if (!assignment) assignment = await Assignment.findById(idOrSlug).populate('courseId', 'title code slug').catch(() => null);
    if (!assignment) { res.status(404).json({ error: 'Assignment not found.' }); return; }

    let submission = null;
    if (req.user!.role === 'student') {
      submission = await Submission.findOne({ assignmentId: assignment._id, studentId: req.user!.userId });
    }

    // Get instructor info from course
    const Course = (await import('../models/Course')).default;
    const course = await Course.findById(assignment.courseId).populate('instructorId', 'name profileImage');

    res.json({ assignment, submission, course });
  } catch (err) { next(err); }
};

export const createAssignment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const assignment = await Assignment.create({ ...req.body, slug });
    res.status(201).json({ assignment });
  } catch (err) { next(err); }
};

export const updateAssignment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!assignment) { res.status(404).json({ error: 'Assignment not found.' }); return; }
    res.json({ assignment });
  } catch (err) { next(err); }
};

export const deleteAssignment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) { res.status(404).json({ error: 'Assignment not found.' }); return; }
    await Submission.deleteMany({ assignmentId: assignment._id });
    res.json({ message: 'Assignment deleted successfully.' });
  } catch (err) { next(err); }
};
