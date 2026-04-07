import { Request, Response, NextFunction } from 'express';
import Enrollment from '../models/Enrollment';
import Assignment from '../models/Assignment';
import Grade from '../models/Grade';
import Course from '../models/Course';
import Submission from '../models/Submission';
import StudentProfile from '../models/StudentProfile';

export const getStudentDashboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;

    // Enrolled courses with progress
    const enrollments = await Enrollment.find({ studentId: userId, status: 'active' })
      .populate({ path: 'courseId', populate: { path: 'instructorId', select: 'name profileImage' } });

    // Upcoming assignments from enrolled courses
    const courseIds = enrollments.map(e => e.courseId);
    const courseObjectIds = courseIds.map(c => (c as any)._id || c);
    const upcomingAssignments = await Assignment.find({
      courseId: { $in: courseObjectIds },
      deadline: { $gte: new Date() },
    }).populate('courseId', 'title code slug').sort({ deadline: 1 }).limit(5);

    // Recent grades
    const recentGrades = await Grade.find({ studentId: userId })
      .populate('courseId', 'title code slug')
      .populate('assignmentId', 'title slug')
      .sort({ gradedAt: -1 }).limit(3);

    // Student profile
    const profile = await StudentProfile.findOne({ userId });

    // Submissions status for upcoming
    const submissions = await Submission.find({ studentId: userId, assignmentId: { $in: upcomingAssignments.map(a => a._id) } });
    const submissionMap = new Map(submissions.map(s => [s.assignmentId.toString(), s]));
    const assignmentsWithStatus = upcomingAssignments.map(a => ({
      ...a.toObject(), submission: submissionMap.get((a._id as any).toString()) || null,
    }));

    res.json({
      enrollments,
      upcomingAssignments: assignmentsWithStatus,
      recentGrades,
      profile,
    });
  } catch (err) { next(err); }
};

export const getInstructorDashboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;

    const courses = await Course.find({ instructorId: userId });
    const courseIds = courses.map(c => c._id);

    const totalStudents = await Enrollment.countDocuments({ courseId: { $in: courseIds }, status: 'active' });
    const totalAssignments = await Assignment.countDocuments({ courseId: { $in: courseIds } });
    const pendingSubmissions = await Submission.countDocuments({
      assignmentId: { $in: await Assignment.find({ courseId: { $in: courseIds } }).distinct('_id') },
      status: 'submitted',
    });
    const recentSubmissions = await Submission.find({
      assignmentId: { $in: await Assignment.find({ courseId: { $in: courseIds } }).distinct('_id') },
    }).populate('studentId', 'name email profileImage').populate('assignmentId', 'title slug').sort({ submittedAt: -1 }).limit(5);

    const recentGrades = await Grade.find({ gradedBy: userId })
      .populate('studentId', 'name').populate('assignmentId', 'title').sort({ gradedAt: -1 }).limit(5);

    const coursesWithStats = await Promise.all(courses.map(async (c) => ({
      ...c.toObject(),
      enrolledCount: await Enrollment.countDocuments({ courseId: c._id }),
    })));

    res.json({
      courses: coursesWithStats,
      stats: { totalStudents, totalAssignments, totalCourses: courses.length, pendingSubmissions },
      recentSubmissions,
      recentGrades,
    });
  } catch (err) { next(err); }
};
