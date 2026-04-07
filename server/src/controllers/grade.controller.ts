import { Request, Response, NextFunction } from 'express';
import Grade from '../models/Grade';
import Submission from '../models/Submission';
import StudentProfile from '../models/StudentProfile';

export const getGrades = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const grades = await Grade.find({ studentId: req.user!.userId })
      .populate('courseId', 'title code slug')
      .populate('assignmentId', 'title slug type')
      .populate('gradedBy', 'name profileImage')
      .sort({ gradedAt: -1 });
    res.json({ grades });
  } catch (err) { next(err); }
};

export const getGPA = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.user!.userId });
    if (!profile) { res.status(404).json({ error: 'Student profile not found.' }); return; }

    const grades = await Grade.find({ studentId: req.user!.userId });
    let totalWeighted = 0;
    let totalMax = 0;
    grades.forEach(g => { totalWeighted += g.score; totalMax += g.maxScore; });
    const percentage = totalMax > 0 ? (totalWeighted / totalMax) * 100 : 0;

    // Simple GPA mapping
    let gpa = 0;
    if (percentage >= 93) gpa = 4.0;
    else if (percentage >= 90) gpa = 3.7;
    else if (percentage >= 87) gpa = 3.3;
    else if (percentage >= 83) gpa = 3.0;
    else if (percentage >= 80) gpa = 2.7;
    else if (percentage >= 77) gpa = 2.3;
    else if (percentage >= 73) gpa = 2.0;
    else if (percentage >= 70) gpa = 1.7;
    else gpa = 1.0;

    profile.gpa = gpa;
    await profile.save();

    res.json({ gpa: profile.gpa, rank: profile.rank, totalGrades: grades.length, averagePercentage: Math.round(percentage * 10) / 10 });
  } catch (err) { next(err); }
};

export const createGrade = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { submissionId, score, maxScore, letterGrade, feedback } = req.body;

    const submission = await Submission.findById(submissionId).populate('assignmentId');
    if (!submission) { res.status(404).json({ error: 'Submission not found.' }); return; }

    const assignment: any = submission.assignmentId;

    const grade = await Grade.create({
      studentId: submission.studentId,
      courseId: assignment.courseId,
      assignmentId: assignment._id,
      submissionId: submission._id,
      score, maxScore, letterGrade, feedback,
      gradedBy: req.user!.userId,
    });

    submission.status = 'graded';
    await submission.save();

    res.status(201).json({ grade });
  } catch (err) { next(err); }
};
