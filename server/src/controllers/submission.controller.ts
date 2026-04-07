import { Request, Response, NextFunction } from 'express';
import Submission from '../models/Submission';
import Assignment from '../models/Assignment';

export const createSubmission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { assignmentId, note, files } = req.body;
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) { res.status(404).json({ error: 'Assignment not found.' }); return; }

    const existing = await Submission.findOne({ assignmentId, studentId: req.user!.userId, status: { $in: ['submitted', 'graded'] } });
    if (existing) { res.status(409).json({ error: 'Already submitted.' }); return; }

    const isLate = new Date() > new Date(assignment.deadline);
    const submission = await Submission.create({
      assignmentId, studentId: req.user!.userId, note, files: files || [],
      status: isLate ? 'late' : 'submitted',
    });

    res.status(201).json({ submission });
  } catch (err) { next(err); }
};

export const getSubmissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { assignmentId } = req.query;
    const filter: any = {};
    if (assignmentId) filter.assignmentId = assignmentId;

    const submissions = await Submission.find(filter)
      .populate('studentId', 'name email profileImage')
      .populate('assignmentId', 'title slug points')
      .sort({ submittedAt: -1 });
    res.json({ submissions });
  } catch (err) { next(err); }
};

export const getMySubmissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const submissions = await Submission.find({ studentId: req.user!.userId })
      .populate('assignmentId', 'title slug courseId type deadline points')
      .sort({ submittedAt: -1 });
    res.json({ submissions });
  } catch (err) { next(err); }
};
