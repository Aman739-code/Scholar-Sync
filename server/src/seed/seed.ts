import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from '../config/db';

import User from '../models/User';
import StudentProfile from '../models/StudentProfile';
import InstructorProfile from '../models/InstructorProfile';
import Course from '../models/Course';
import Module from '../models/Module';
import Enrollment from '../models/Enrollment';
import Announcement from '../models/Announcement';
import Assignment from '../models/Assignment';
import Submission from '../models/Submission';
import Grade from '../models/Grade';
import LibraryResource from '../models/LibraryResource';
import ResourceChapter from '../models/ResourceChapter';
import ReadingProgress from '../models/ReadingProgress';
import Notification from '../models/Notification';
import SavedCollection from '../models/SavedCollection';

interface SeedStats {
  users: number;
  courses: number;
  modules: number;
  enrollments: number;
  announcements: number;
  assignments: number;
  submissions: number;
  grades: number;
  libraryResources: number;
  resourceChapters: number;
  readingProgress: number;
  notifications: number;
  savedCollections: number;
}

const seed = async () => {
  await connectDB();
  console.log('🌱 Seeding database...');

  const stats: SeedStats = {
    users: 0,
    courses: 0,
    modules: 0,
    enrollments: 0,
    announcements: 0,
    assignments: 0,
    submissions: 0,
    grades: 0,
    libraryResources: 0,
    resourceChapters: 0,
    readingProgress: 0,
    notifications: 0,
    savedCollections: 0,
  };

  // Clear all collections
  await Promise.all([
    User.deleteMany({}), StudentProfile.deleteMany({}), InstructorProfile.deleteMany({}),
    Course.deleteMany({}), Module.deleteMany({}), Enrollment.deleteMany({}),
    Announcement.deleteMany({}), Assignment.deleteMany({}), Submission.deleteMany({}),
    Grade.deleteMany({}), LibraryResource.deleteMany({}), ResourceChapter.deleteMany({}),
    ReadingProgress.deleteMany({}), Notification.deleteMany({}), SavedCollection.deleteMany({}),
  ]);

  // ─── USERS ───
  const student = await User.create({
    name: 'Julian Academic', email: 'julian@scholarsync.edu',
    passwordHash: 'password123', role: 'student',
    profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo8FbTKqGovG8wXdZ1OR7knTSAhfv4nlTpl_G5jVCqS_-6z0EgKZ5qzxxczr4xEoc9AlPfeP7ePntjUF-rwX7fnaL2hLd__eZaJuaZ5A0nFSlHFfMMGr0Pkw53KN-4YiXYsViaDwmrUneYGnQxbHIbFL799MPX7-6n7Oj9JBikPjCV9uP08OjcP1P5GbqMa2wcx2SXwu0wTKt29WLDrbALsHcW0K-9prF5Bp6LUkozLkzjn2TsiA-fyXk7QdetWA7pVsWb6Iwzb6zM',
  });
  await StudentProfile.create({ userId: student._id, studentId: 'STU-2024-001', department: 'Computer Science', year: 3, gpa: 3.88, rank: 'Top 5%' });

  const instructor1 = await User.create({
    name: 'Prof. Elena Richardson', email: 'elena@scholarsync.edu',
    passwordHash: 'password123', role: 'instructor',
    profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRBZP87-6fWfnOiu3pwx-lcydGvLvtAxs0Nt07Ct5TPmyBGpfVKI01RRlzxGRw7G7xuJGh3sSc-3Q8e0vlktUXGa1axYvhByKWQCBo427LzARRNvjEnRH_wFg7-j1uTdUSvHfcbLQtWJWTBovSFFi5OJTiMkBjR81YYCJQ2EOplGXHXdSwc-Slzb-qyf7CNbMiPGDeMz8E4S5rHu0qV7XhGZ-jM3fdOIpAaWhw8sgIExBWEh2arA0OSDl9O70rim5HvtX5hn45BjGt',
  });
  await InstructorProfile.create({ userId: instructor1._id, facultyId: 'FAC-CS-001', department: 'Computer Science', specialization: 'Algorithms & Data Structures', bio: 'Professor of Computer Science specializing in advanced algorithms.' });

  const instructor2 = await User.create({
    name: 'Prof. Marcus Thorne', email: 'marcus@scholarsync.edu',
    passwordHash: 'password123', role: 'instructor',
    profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACzjNeAf251RR0JRdQGoH9m_KALs7WOZN-cxu9hj8co9BkA1yHX324oDLkrO1XqwSmisSaRC0ieI8cQvi7oD8ZAQpblw-mVouqWQbo8RzhEEzAjhT7tjqqnItKpR1DupmKgoXYmOPOD2YL3lCmdqMBaxbg9YkvF8mhMNCqjBuMtg4ob8Hq4UKEiOR4LuCNlCb4Ir2wOdXhdmJCPL302_wz2C292WRNvVCqmGG2IZcXsRpcMq2WnzVDBcihHLgQmv8MQ9iU-io_u0Wr',
  });
  await InstructorProfile.create({ userId: instructor2._id, facultyId: 'FAC-MATH-001', department: 'Mathematics', specialization: 'Discrete Mathematics', bio: 'Professor of Mathematics with focus on discrete structures.' });

  const instructor3 = await User.create({
    name: 'Prof. Sarah Jenkins', email: 'sarah@scholarsync.edu',
    passwordHash: 'password123', role: 'instructor',
    profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCKd8j7trgQdT9L8htMrlqu8tYRERP_WgGoOqdji0K7SKhhbrQD5bT8bkfLv8SA48ibr5WG7lKHrPvzcOy4SU4fLtiNlX48wxipN1LAmS0CHTQ0N-teAkQWuckneIWwScX5Ihi52Qszh7QttPTpdU6rntvAjwAdpXfTkW5bA0eLzWNBDp0hzSQc7ki0OY0P_UM0asPe15Xy_DrcY2wRsNI0ac5YtEvOkZn5vl19yn_lAaAUCG6EgZCZQz1lxNnbQGfj_IwVL7YSAvG',
  });
  await InstructorProfile.create({ userId: instructor3._id, facultyId: 'FAC-CS-002', department: 'Computer Science', specialization: 'Information Systems', bio: 'Associate Professor specializing in global information systems.' });

  const instructor4 = await User.create({
    name: 'Dr. Elena Rodriguez', email: 'rodriguez@scholarsync.edu',
    passwordHash: 'password123', role: 'instructor',
    profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZzP3drDySh-AmjqEK5H2G4TirlEosFOxVwzWPT1gChSPe-Stj0mreexu0vtCKwwQNzJbn8FiESlngFQEmdYvs9NaJpCygYSkhwbhMBNNAuN1Blv01AGBkawwSK84sYWrcnBSqLRpogWVokzQ3CdUnkBj9lf9TjDmzwdGtDuI8nVTX7M6FHX3W5IEiuiRGQfgwcXOVtgqCnoB7QwqLx1W9qAGaEHJy-QBQnBG_sJ2AJpv_WRfcTS71UotShN3yuHdpLavwxYBfnNRZ',
  });
  await InstructorProfile.create({ userId: instructor4._id, facultyId: 'FAC-CS-003', department: 'Computer Science', specialization: 'Neural Networks & Deep Learning', bio: 'Research scientist in ML/AI.' });
  stats.users = 5;

  // ─── COURSES ───
  const courseADS = await Course.create({ title: 'Advanced Algorithms & Data Structures', code: 'CS301', slug: 'advanced-data-structures', description: 'An intensive exploration of advanced data structures and algorithmic techniques. Covers B-Trees, Red-Black Trees, hash tables, graph algorithms, amortized analysis, and randomized algorithms. Includes substantial programming assignments.', instructorId: instructor1._id, bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZRSMGnBh_YUaFh5kBeXokD6qQUXOxbG65jHIuWuBkd-bZOK7oHDap4vZXrXwG7d0BC6MOEWqcNuVTHzF938psUARm2BmbLKttLF_g-GjUfMRJ_7IECm6LH40KPb0dRO3s2V7LLrDzC-sr65CEiLiEJHdxczg36gPLgdWVZ25gok1tAYg0jHaLRhwqk9lBRC6oNvxV31Il17XADu5GJFte5Y49oCyxliaXejGgT74IeWfeSYi_QisyWWv6EEKfv8BEEsYA9_ZjR-bm', units: 4, semester: 'Fall 2024', schedule: 'Mon/Wed/Fri 9:00 AM – 10:00 AM', track: 'Computer Science', maxCapacity: 60 });
  const courseDM = await Course.create({ title: 'Discrete Mathematical Structures', code: 'MATH204', slug: 'discrete-math', description: 'A foundational course in discrete mathematics covering combinatorics, graph theory, number theory, set theory, relations, and formal proof techniques. Essential for computer science and mathematics students.', instructorId: instructor2._id, bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh0Hvr25SsEcLEQk930JQU2dMAaY0zEK2hgvVInCfd3njtDZve0W3W5QRivHlvk0btpPgkc5_WxVhrEDwwEX7v6HCgTI5H_Bp30QWT4rHutGn2PRuhKLv6DSY0QSZfgCs2U-wp13cxsIlPNysT0NP1AF4Ry12v-FOvPtvO7Vr7tqurJTWP2aHQ3GWfDA0M8ZjswAWVEWRGFp6cM_CBVL5J8EPMHYTBgYp_9mDYlSR3TQ12efI3VpYb91-CgjHYYx6J6NgpsAaFOhYg', units: 3, semester: 'Fall 2024', schedule: 'Tue/Thu 10:00 AM – 11:30 AM', track: 'Mathematics', maxCapacity: 80 });
  const courseIS = await Course.create({ title: 'Global Information Systems', code: 'INFO102', slug: 'info-systems', description: 'Examines how global organizations leverage information systems for strategic advantage. Topics include ERP systems, cloud computing, cybersecurity, data governance, and the societal impact of IT across different cultures and economies.', instructorId: instructor3._id, bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv4U9BHWEmwABDldKtQoETJV3f_z34SvMxsroPoeaD3wXNkwP7cKFE8Q4SLahTmmMR5tzGUu4Af9lJrngvOk2BhdavaQDbUTG64U9VQjuTAgJ2V9HYLle8XVTVAfTy9Wv0KrkF-p-1SqN1h27uXKgtQO5SAS5y-0As5_07slrd2-JxK9kGvGK9hnbyYP5smwnRscT3Z898deIC7R_ZpuTJ-fGldeaUe2kMSsJRIA2vC3773eHP5iZfSYxN4g8Y75poiBhFs1H_aeVu', units: 3, semester: 'Fall 2024', schedule: 'Wed/Fri 2:00 PM – 3:30 PM', track: 'Computer Science', maxCapacity: 50 });
  const courseAA = await Course.create({ title: 'Advanced Algorithm Design', code: 'CS304', slug: 'advanced-algorithms', description: 'This course explores advanced algorithmic paradigms including dynamic programming, greedy algorithms, graph algorithms, network flow, and computational complexity.', instructorId: instructor1._id, bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUHaBHXlzHDEtyptu3DyJXlOc6j-ybndPrZWC0LI_VQKrD1n-MjXcvRrQTketSSNVGg44IA-PZebGLBzR6LausEkxPH9OAjiAGL-PUM5x7Gl-obhQwN6I0cnaZz7W3O_tCjwcIj9QZVXbxzdvUR4WQSTxlLNejW8B-joa1YBZLvtqXj7p0G4FjuhS0ZAVlTU0oiwuPD2zuIGB6te2E5M8Zh4HOXfwfkOoSpAfHi0rNKzbTWSyhJKZdOOtS_Hen56ZUG8Hbiloct88y', units: 4, semester: 'Fall 2024', schedule: 'Mon/Wed 10:00 AM – 11:30 AM', track: 'Computer Science', maxCapacity: 50 });
  const courseLA = await Course.create({ title: 'Linear Algebra & Logic', code: 'MA210', slug: 'linear-algebra', description: 'A rigorous introduction to linear algebra and mathematical logic. Topics include vector spaces, linear transformations, eigenvalues, propositional and predicate logic, and proofs.', instructorId: instructor2._id, bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3g2nm1i5r0C6MO59z0JZmGZuOW9W2Rd1Y2z1TYBAz_ly60YwOxZQuuljEWgAjVtdbdgSjImWFU1Tl2Oo7ZPJIJOf49etOv9VORPwt1Sp4ZkzVkwfV7LxzTTP18m5PJAy9HucqqL8bulkZPHQH3Hzp6e01p-mBIxwMB2_tC69ltULEokC5UEpWj0SO9PtfanTfJuqv5zJ_adxjR7wX8lcRIyUKnsLakE1xQiN3A5lnJQBL6yqq6xUEq7sV3VasYxjC3HxuNCgzI0x5', units: 3, semester: 'Fall 2024', schedule: 'Tue/Thu 1:00 PM – 2:30 PM', track: 'Mathematics', maxCapacity: 60 });
  const courseNN = await Course.create({ title: 'Neural Networks & Deep Learning Essentials', code: 'CS450', slug: 'neural-networks', description: 'A deep dive into the foundations of modern AI. Covers perceptrons, backpropagation, convolutional networks, recurrent networks, transformers, and generative models.', instructorId: instructor4._id, bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrokmwUiV-lF_Q2s_AJdRcqWrEX1W0I3S8WeNIy-0J6MDOSz0gy4daMv923SNUpfjbKgDV656CxKBHnAmWYfJ1Ak5xfObdg_WYYblG4Gdk29E9RPccoSJjzQXJ5IyqFHGo_I7E_osLYTTBw-hlRKV0WtbYprqbzp4QA7zTtZiD-ItQP_-DwU6Boo_SdyqylZr1-UBBMHZlvOsN7eb3KLxI4pwtTjX3QXTDMUjPNmHD1-KGELrEqoA4kSIRx3n2Blfy3NqyyEcXIxEC', units: 4, semester: 'Spring 2025', schedule: 'To be announced', track: 'Computer Science', maxCapacity: 40 });
  const courseQC = await Course.create({ title: 'Advanced Quantum Computing', code: 'CS480', slug: 'quantum-computing', description: 'A comprehensive deep-dive into qubit manipulation and quantum algorithmic structures for senior researchers.', instructorId: instructor4._id, bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrokmwUiV-lF_Q2s_AJdRcqWrEX1W0I3S8WeNIy-0J6MDOSz0gy4daMv923SNUpfjbKgDV656CxKBHnAmWYfJ1Ak5xfObdg_WYYblG4Gdk29E9RPccoSJjzQXJ5IyqFHGo_I7E_osLYTTBw-hlRKV0WtbYprqbzp4QA7zTtZiD-ItQP_-DwU6Boo_SdyqylZr1-UBBMHZlvOsN7eb3KLxI4pwtTjX3QXTDMUjPNmHD1-KGELrEqoA4kSIRx3n2Blfy3NqyyEcXIxEC', units: 4, semester: 'Spring 2025', schedule: 'To be announced', track: 'Computer Science', maxCapacity: 30 });
  stats.courses = 7;

  // ─── MODULES ───
  const moduleData: Record<string, { title: string; status: string; duration: string }[]> = {
    ads: [
      { title: 'B-Trees & Balanced Search Trees', status: 'completed', duration: '3 weeks' },
      { title: 'Hash Tables & Collision Resolution', status: 'completed', duration: '2 weeks' },
      { title: 'Graph Traversals & Shortest Paths', status: 'completed', duration: '3 weeks' },
      { title: 'Minimum Spanning Trees', status: 'current', duration: '2 weeks' },
      { title: 'Amortized Analysis', status: 'upcoming', duration: '2 weeks' },
      { title: 'Randomized Algorithms', status: 'upcoming', duration: '2 weeks' },
    ],
    dm: [
      { title: 'Set Theory & Logic', status: 'completed', duration: '2 weeks' },
      { title: 'Combinatorics & Counting', status: 'completed', duration: '3 weeks' },
      { title: 'Graph Theory Fundamentals', status: 'current', duration: '3 weeks' },
      { title: 'Number Theory & Modular Arithmetic', status: 'upcoming', duration: '2 weeks' },
      { title: 'Relations & Functions', status: 'upcoming', duration: '2 weeks' },
      { title: 'Formal Proofs & Induction', status: 'upcoming', duration: '2 weeks' },
    ],
    is: [
      { title: 'Foundations of Information Systems', status: 'completed', duration: '2 weeks' },
      { title: 'Enterprise Resource Planning', status: 'completed', duration: '2 weeks' },
      { title: 'Cloud Computing & Infrastructure', status: 'completed', duration: '3 weeks' },
      { title: 'Cybersecurity Fundamentals', status: 'completed', duration: '2 weeks' },
      { title: 'Data Governance & Compliance', status: 'current', duration: '2 weeks' },
      { title: 'Global IT Strategy & Ethics', status: 'upcoming', duration: '3 weeks' },
    ],
    aa: [
      { title: 'Asymptotic Analysis & Recurrences', status: 'completed', duration: '2 weeks' },
      { title: 'Divide & Conquer Strategies', status: 'completed', duration: '2 weeks' },
      { title: 'Dynamic Programming', status: 'completed', duration: '3 weeks' },
      { title: 'Greedy Algorithms & Matroids', status: 'current', duration: '2 weeks' },
      { title: 'Graph Algorithms & Network Flow', status: 'upcoming', duration: '3 weeks' },
      { title: 'NP-Completeness & Approximation', status: 'upcoming', duration: '2 weeks' },
    ],
    la: [
      { title: 'Systems of Linear Equations', status: 'completed', duration: '2 weeks' },
      { title: 'Vector Spaces & Subspaces', status: 'current', duration: '3 weeks' },
      { title: 'Linear Transformations', status: 'upcoming', duration: '2 weeks' },
      { title: 'Eigenvalues & Eigenvectors', status: 'upcoming', duration: '3 weeks' },
      { title: 'Propositional Logic', status: 'upcoming', duration: '2 weeks' },
      { title: 'Predicate Logic & Proofs', status: 'upcoming', duration: '2 weeks' },
    ],
    nn: [
      { title: 'Perceptrons & Activation Functions', status: 'upcoming', duration: '2 weeks' },
      { title: 'Backpropagation & Optimization', status: 'upcoming', duration: '3 weeks' },
      { title: 'Convolutional Neural Networks', status: 'upcoming', duration: '3 weeks' },
      { title: 'Recurrent Networks & LSTMs', status: 'upcoming', duration: '2 weeks' },
      { title: 'Transformers & Attention', status: 'upcoming', duration: '3 weeks' },
      { title: 'Generative Models & GANs', status: 'upcoming', duration: '2 weeks' },
    ],
    qc: [
      { title: 'Quantum Mechanics Foundations', status: 'upcoming', duration: '2 weeks' },
      { title: 'Qubits & Quantum Gates', status: 'upcoming', duration: '3 weeks' },
      { title: 'Quantum Entanglement', status: 'upcoming', duration: '2 weeks' },
      { title: "Shor's & Grover's Algorithms", status: 'upcoming', duration: '3 weeks' },
      { title: 'Quantum Error Correction', status: 'upcoming', duration: '2 weeks' },
      { title: 'Quantum Machine Learning', status: 'upcoming', duration: '3 weeks' },
    ],
  };

  const courseMap: Record<string, any> = { ads: courseADS, dm: courseDM, is: courseIS, aa: courseAA, la: courseLA, nn: courseNN, qc: courseQC };
  const allModules: Record<string, any[]> = {};
  for (const [key, mods] of Object.entries(moduleData)) {
    allModules[key] = await Module.insertMany(mods.map((m, i) => ({ ...m, courseId: courseMap[key]._id, orderIndex: i + 1 })));
  }
  stats.modules = Object.values(allModules).reduce((count, modules) => count + modules.length, 0);

  // ─── ENROLLMENTS ───
  const completedADS = allModules.ads.filter(m => m.status === 'completed').map(m => m._id);
  const completedDM = allModules.dm.filter(m => m.status === 'completed').map(m => m._id);
  const completedIS = allModules.is.filter(m => m.status === 'completed').map(m => m._id);

  await Enrollment.insertMany([
    { studentId: student._id, courseId: courseADS._id, progress: 64, status: 'active', completedModules: completedADS },
    { studentId: student._id, courseId: courseDM._id, progress: 42, status: 'active', completedModules: completedDM },
    { studentId: student._id, courseId: courseIS._id, progress: 88, status: 'active', completedModules: completedIS },
  ]);
  stats.enrollments = 3;

  // ─── ANNOUNCEMENTS ───
  await Announcement.insertMany([
    { courseId: courseADS._id, postedBy: instructor1._id, text: 'Lab 5 on MST algorithms is now available. Due Nov 1.', postedDate: new Date('2024-10-21') },
    { courseId: courseADS._id, postedBy: instructor1._id, text: 'Midterm exam results: Class median 78/100. Great work!', postedDate: new Date('2024-10-17') },
    { courseId: courseDM._id, postedBy: instructor2._id, text: 'Midterm exam: November 3 in class. Review sheet provided.', postedDate: new Date('2024-10-23') },
    { courseId: courseDM._id, postedBy: instructor2._id, text: 'Study groups for midterm prep available in the Forum.', postedDate: new Date('2024-10-19') },
    { courseId: courseIS._id, postedBy: instructor3._id, text: 'Final project proposals due November 10. See rubric.', postedDate: new Date('2024-10-22') },
    { courseId: courseIS._id, postedBy: instructor3._id, text: 'Guest lecture by AWS Solutions Architect on Friday.', postedDate: new Date('2024-10-20') },
    { courseId: courseAA._id, postedBy: instructor1._id, text: 'Midterm grades posted. Class average: 82%. Well done!', postedDate: new Date('2024-10-20') },
    { courseId: courseAA._id, postedBy: instructor1._id, text: 'Office hours moved to Thursday 3-5 PM this week only.', postedDate: new Date('2024-10-18') },
  ]);
  stats.announcements = 8;

  // ─── ASSIGNMENTS ───
  const imgNN = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbeORq6rC9nVB_eVQZ7aAUlA445wqv_JqcUWxAplhfP2IfmTjd1NcSk0UEfmG040X_4roykQUYrqfG5t2GFoiXSGpTmpiFAHkmGtABnssDiOwS9a7AadaBECvKFe9gSj8-umcwU0S8ajFdQC8OPK7f0SG3rG9-XKGE4Uko_42FaHXgllznKS4nDmsxH8V29SwHyCwpiyyPsEvOzAOuzI7OLwm0GhG4METrJ8Yl2xF3Gv2ztPvbO4qxht7oyDcAkNm2SmqC_Orl37FV';
  const imgAA = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUHaBHXlzHDEtyptu3DyJXlOc6j-ybndPrZWC0LI_VQKrD1n-MjXcvRrQTketSSNVGg44IA-PZebGLBzR6LausEkxPH9OAjiAGL-PUM5x7Gl-obhQwN6I0cnaZz7W3O_tCjwcIj9QZVXbxzdvUR4WQSTxlLNejW8B-joa1YBZLvtqXj7p0G4FjuhS0ZAVlTU0oiwuPD2zuIGB6te2E5M8Zh4HOXfwfkOoSpAfHi0rNKzbTWSyhJKZdOOtS_Hen56ZUG8Hbiloct88y';
  const imgLA = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3g2nm1i5r0C6MO59z0JZmGZuOW9W2Rd1Y2z1TYBAz_ly60YwOxZQuuljEWgAjVtdbdgSjImWFU1Tl2Oo7ZPJIJOf49etOv9VORPwt1Sp4ZkzVkwfV7LxzTTP18m5PJAy9HucqqL8bulkZPHQH3Hzp6e01p-mBIxwMB2_tC69ltULEokC5UEpWj0SO9PtfanTfJuqv5zJ_adxjR7wX8lcRIyUKnsLakE1xQiN3A5lnJQBL6yqq6xUEq7sV3VasYxjC3HxuNCgzI0x5';
  const imgADS = courseADS.bannerImage;
  const imgNNcourse = courseNN.bannerImage;

  const a1 = await Assignment.create({ courseId: courseNN._id, title: 'Advanced Neural Networks: Term Project Phase 1', slug: 'neural-networks-term-project', description: 'Design and submit a detailed architectural proposal for a transformer-based model focusing on efficient memory management.', type: 'project', deadline: new Date('2024-10-24T23:59:00'), points: 150, status: 'due_soon', icon: 'neurology', bannerImage: imgNN, instructorNote: 'Focus on the memory efficiency angle — this is what separates strong proposals. Reference at least 3 recent papers from 2023-2024.', requirements: ['Architecture diagram of proposed transformer model (min 6 layers)', 'Training strategy with learning rate schedule and optimizer selection', 'Memory efficiency analysis comparing to baseline architectures', 'Expected performance benchmarks with justification', 'Code implementation plan with timeline (Phase 2 preparation)'], rubric: [{ criteria: 'Architecture Design', weight: '30%', description: 'Novelty and technical soundness of the proposed architecture' }, { criteria: 'Technical Writing', weight: '25%', description: 'Clarity, structure, and depth' }, { criteria: 'Memory Analysis', weight: '25%', description: 'Thoroughness of efficiency analysis' }, { criteria: 'Implementation Plan', weight: '20%', description: 'Feasibility of the proposed code timeline' }], resources: [{ name: 'Attention Is All You Need (Vaswani et al.)', type: 'Paper' }, { name: 'Efficient Transformers: A Survey', type: 'Paper' }, { name: 'Project Template (LaTeX)', type: 'Template' }] });
  const a2 = await Assignment.create({ courseId: courseADS._id, title: 'Distributed Systems: Consensus Algorithms Quiz', slug: 'consensus-algorithms-quiz', description: 'Online quiz covering consensus algorithms including Paxos, Raft, and Byzantine Fault Tolerance.', type: 'quiz', deadline: new Date('2024-10-26'), points: 40, status: 'available', icon: 'description', bannerImage: imgADS, instructorNote: 'The quiz is open-note but timed. Review the lecture recordings on Raft leader election.', requirements: ['Understand the Paxos consensus protocol phases', 'Compare Raft and Paxos', 'Explain Byzantine Fault Tolerance', 'Analyze fault tolerance guarantees'], rubric: [{ criteria: 'Knowledge', weight: '50%', description: 'Correct understanding' }, { criteria: 'Analysis', weight: '30%', description: 'Ability to compare' }, { criteria: 'Application', weight: '20%', description: 'Apply concepts' }], resources: [{ name: 'Raft Visualization', type: 'Interactive' }, { name: 'Paxos Made Simple (Lamport)', type: 'Paper' }] });
  const a3 = await Assignment.create({ courseId: courseADS._id, title: 'Cryptography: RSA Implementation Lab', slug: 'rsa-implementation-lab', description: 'Implement the RSA public-key cryptosystem from scratch.', type: 'lab', deadline: new Date('2024-10-21'), points: 100, status: 'urgent', icon: 'code', bannerImage: imgADS, instructorNote: 'Use Python built-in big integer support. Do NOT use any cryptography libraries.', requirements: ['Implement prime number generation', 'RSA key pair generation', 'Encryption and decryption', 'Digital signature generation', 'Include at least 10 test cases'], rubric: [{ criteria: 'Key Generation', weight: '25%', description: 'Correct prime generation' }, { criteria: 'Encryption/Decryption', weight: '30%', description: 'Correct RSA operations' }, { criteria: 'Signatures', weight: '25%', description: 'Working digital signature scheme' }, { criteria: 'Testing & Docs', weight: '20%', description: 'Comprehensive tests' }], resources: [{ name: 'NIST FIPS 186-5', type: 'Standard' }, { name: 'Handbook of Applied Cryptography Ch. 8', type: 'Textbook' }] });
  const a4 = await Assignment.create({ courseId: courseNN._id, title: 'Ethics in AI: Weekly Reflection', slug: 'ethics-weekly-reflection', description: 'Write a 500-word reflection on the ethical implications of the AI topic covered this week.', type: 'reflection', deadline: new Date('2024-10-27T23:59:00'), points: 20, status: 'available', icon: 'edit_note', bannerImage: imgNNcourse, instructorNote: 'Be bold with your opinions — this is a reflection, not a research paper.', requirements: ['500-word minimum reflection essay', 'Address at least 2 ethical frameworks', 'Include real-world case study references', 'Propose actionable guidelines'], rubric: [{ criteria: 'Depth of Analysis', weight: '40%', description: 'Thoughtful engagement' }, { criteria: 'Framework Application', weight: '30%', description: 'Correct use of frameworks' }, { criteria: 'Writing Quality', weight: '20%', description: 'Clear, well-structured prose' }, { criteria: 'References', weight: '10%', description: 'Relevant sources' }], resources: [{ name: 'AI Ethics: A Textbook (DRAFT)', type: 'Textbook' }] });
  const a5 = await Assignment.create({ courseId: courseAA._id, title: 'Dynamic Programming Lab', slug: 'dynamic-programming-lab', description: 'Implement solutions to three dynamic programming problems of increasing complexity.', type: 'lab', deadline: new Date('2024-10-24T23:59:00'), points: 80, status: 'due_soon', icon: 'code', bannerImage: imgAA, instructorNote: 'Start with LCS — it\'s the most straightforward.', requirements: ['Implement LCS algorithm', 'Solve Matrix Chain Multiplication', 'Design solution for Knapsack problem (0/1)', 'Include complexity analysis', 'Write unit tests'], rubric: [{ criteria: 'Correctness', weight: '40%', description: 'Correct output' }, { criteria: 'Efficiency', weight: '25%', description: 'Optimal complexity' }, { criteria: 'Code Quality', weight: '20%', description: 'Clean code' }, { criteria: 'Testing', weight: '15%', description: 'Edge cases' }], resources: [{ name: 'CLRS Chapter 15', type: 'Textbook' }, { name: 'Lab Starter Code', type: 'Code' }] });
  const a6 = await Assignment.create({ courseId: courseADS._id, title: 'Compiler Design: Lexical Analysis', slug: 'lexical-analysis', description: 'Build a lexical analyzer (tokenizer) for a simplified programming language.', type: 'lab', deadline: new Date('2024-10-18'), points: 60, status: 'available', icon: 'check_circle', bannerImage: imgADS, instructorNote: 'Good submission. Awaiting grade.', requirements: ['Tokenize keywords, identifiers, and operators', 'Handle string and numeric literals', 'Support single-line and multi-line comments', 'Error reporting with line numbers', 'Generate token stream output file'], rubric: [{ criteria: 'Tokenization', weight: '40%', description: 'Identifies all token types' }, { criteria: 'Error Handling', weight: '20%', description: 'Graceful reporting' }, { criteria: 'Edge Cases', weight: '20%', description: 'Nested comments, escape sequences' }, { criteria: 'Code Quality', weight: '20%', description: 'Clean state machine' }], resources: [{ name: 'Dragon Book Ch. 3', type: 'Textbook' }] });
  const a7 = await Assignment.create({ courseId: courseLA._id, title: 'Vector Spaces Quiz', slug: 'vector-spaces-quiz', description: 'In-class quiz covering vector spaces, subspaces, linear independence, basis, and dimension.', type: 'quiz', deadline: new Date('2024-10-27'), points: 50, status: 'available', icon: 'quiz', bannerImage: imgLA, instructorNote: 'Focus on the proof techniques from HW 3 and 4.', requirements: ['Know definitions', 'Prove subspace membership', 'Determine linear independence', 'Find a basis', 'Compute dimension'], rubric: [{ criteria: 'Definitions', weight: '20%', description: 'Correct statements' }, { criteria: 'Computational', weight: '40%', description: 'Accuracy' }, { criteria: 'Proofs', weight: '30%', description: 'Logical rigor' }, { criteria: 'Presentation', weight: '10%', description: 'Neat work' }], resources: [{ name: 'Practice Quiz', type: 'Practice' }, { name: 'Chapter 4 Review Notes', type: 'Notes' }] });
  stats.assignments = 7;

  // ─── SUBMISSIONS ───
  const sub1 = await Submission.create({ assignmentId: a6._id, studentId: student._id, note: 'Completed lexical analysis implementation', submittedAt: new Date('2024-10-18T22:42:00'), status: 'submitted', files: [{ filename: 'lexer.py', mimetype: 'text/x-python', size: 15200, url: '/uploads/lexer.py' }] });
  const sub2 = await Submission.create({ assignmentId: a5._id, studentId: student._id, note: 'DP lab with all three problems solved', submittedAt: new Date('2024-10-15T20:30:00'), status: 'graded', files: [{ filename: 'dp_solutions.zip', mimetype: 'application/zip', size: 24000, url: '/uploads/dp_solutions.zip' }] });
  const sub3 = await Submission.create({ assignmentId: a7._id, studentId: student._id, note: '', submittedAt: new Date('2024-10-12T14:00:00'), status: 'graded', files: [] });
  stats.submissions = 3;

  // ─── GRADES ───
  await Grade.create({ studentId: student._id, courseId: courseADS._id, assignmentId: a6._id, submissionId: sub1._id, score: 92, maxScore: 100, letterGrade: 'A-', feedback: 'Exceptional performance on the B-Tree implementation. Ensure your documentation covers edge cases for concurrent access in the final module.', gradedBy: instructor1._id, gradedAt: new Date('2024-10-10') });
  await Grade.create({ studentId: student._id, courseId: courseAA._id, assignmentId: a5._id, submissionId: sub2._id, score: 96, maxScore: 100, letterGrade: 'A', feedback: 'Your critique of the Social Contract theory was sophisticated and well-cited. A standout paper in the mid-term reviews.', gradedBy: instructor2._id, gradedAt: new Date('2024-10-08') });
  await Grade.create({ studentId: student._id, courseId: courseIS._id, assignmentId: a2._id, submissionId: sub3._id, score: 88, maxScore: 100, letterGrade: 'B+', feedback: 'Strong understanding of SQL joins. Focus on Query Optimization and indexing strategies for the next lab to boost your grade.', gradedBy: instructor3._id, gradedAt: new Date('2024-10-05') });
  stats.grades = 3;

  // ─── LIBRARY RESOURCES ───
  const lib1 = await LibraryResource.create({ title: 'Principles of Neural Design', slug: 'neural-design', author: 'Peter Sterling & Simon Laughlin', year: '2021', type: 'textbook', category: 'Neuroscience', description: 'A comprehensive exploration of why neural systems are designed the way they are.', coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOPjirJSPJ4aifofM6qdz6VSYl1RcQooTrsQwkbZAjrEKWKWswlkXEH0n4eM8WbvfzMn-enHY0rJX1O_HDHRH20mXmlmlQj3DwJecTEOSr0AO8fLKtg9porZT_aAZIW6oIXh33SSSoLkdFmEsVNVdQBqGFSXJwQlDypMP4DUkSSpDGHbYX2BFdhMa0CA7ppu4z2MNDBf1mzmSrDkgHaUfqcH8iozkFBnZlwGOhvGjYm842BrwVYYx6VApSQ8ou28m1j1pNyPzbWysq', isbn: '978-0-262-53468-0', publisher: 'MIT Press', pages: 480 });
  await ResourceChapter.insertMany([
    { resourceId: lib1._id, title: 'Why an Animal Needs a Brain', pages: '1-22', orderIndex: 1, isRead: true },
    { resourceId: lib1._id, title: 'What Engineers Know About Design', pages: '23-48', orderIndex: 2, isRead: true },
    { resourceId: lib1._id, title: 'Why Use Analogue?', pages: '49-84', orderIndex: 3, isRead: true },
    { resourceId: lib1._id, title: 'The Principles of Efficient Transport', pages: '85-120', orderIndex: 4, isRead: true },
    { resourceId: lib1._id, title: 'How Neurons Manage Space', pages: '121-160', orderIndex: 5, isRead: false },
    { resourceId: lib1._id, title: 'Information Processing', pages: '161-210', orderIndex: 6, isRead: false },
    { resourceId: lib1._id, title: 'Neural Circuits', pages: '211-265', orderIndex: 7, isRead: false },
    { resourceId: lib1._id, title: 'The Design of Retina', pages: '266-320', orderIndex: 8, isRead: false },
  ]);
  await ReadingProgress.create({ userId: student._id, resourceId: lib1._id, currentPage: 142, lastAccessed: new Date() });

  const lib2 = await LibraryResource.create({ title: 'Quantum Computing Ethics', slug: 'quantum-computing-ethics', author: 'MIT Technology Review', year: 'Vol 14, 2024', type: 'journal', category: 'Computer Science', description: 'A special issue exploring the ethical dimensions of quantum computing.', coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeeUhpyHPm_T9i8c55WuQ2WaHNB0iV3D9eaunNPEwfi9-t46EKIKHSh4YPRfT3SB-y285DxYvlLuFiwEDpA-iGUxjjl9jdthFCpmPZaEul2o5UyGXg6m7Pc7k89sQ7VxHs8CiuJyJFvPOT-GUVLGQgjxd_WPqIvlQfT13RakEPUVyE95QZv10X66Ov5P6e5cpk8AoE1XI4GSLXQgDilbncSDyHUQDDt-cz8hWxR3z-MH5yqWEAUWk2ayXzY7eLOm5SIozAuTg9Ivjk', issn: 'ISSN 0040-1692', publisher: 'MIT Technology Review', pages: 32 });
  await ResourceChapter.insertMany([
    { resourceId: lib2._id, title: 'The Quantum Computing Landscape 2024', pages: '1-6', orderIndex: 1, isRead: true },
    { resourceId: lib2._id, title: 'Ethics of Quantum Supremacy', pages: '7-14', orderIndex: 2, isRead: true },
    { resourceId: lib2._id, title: "Post-Quantum Cryptography: Who's at Risk?", pages: '15-22', orderIndex: 3, isRead: true },
    { resourceId: lib2._id, title: 'Quantum Access and Digital Divide', pages: '23-32', orderIndex: 4, isRead: true },
  ]);
  await ReadingProgress.create({ userId: student._id, resourceId: lib2._id, currentPage: 32, lastAccessed: new Date(Date.now() - 7200000) });

  const lib3 = await LibraryResource.create({ title: 'Advanced Algorithm Design — Lecture 14', slug: 'algorithm-design-video', author: 'Dr. Sarah Jenkins • Stanford University', year: '2024', type: 'video_lecture', category: 'Computer Science', description: 'Lecture 14 covers advanced dynamic programming techniques.', coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmuiIE9TP9TiUUNPUwTdBp_z4tClOj-6zwFXEqjOZIDOEntTXUyjJhqaRrv0Dnba4E7lYLHaVeSn2Xwh_okFaMUj4tkekeyyxk1iy6miNu0cE_6nm_BXu_nzY_V6wIhf78x6bMwBMBkgz3_bHveYC8mdy3zC1e144WYTVaudsaF-XKsp6XseH1PCRIDX06x_BZUuC8YqGZQVaLXn6KCjTWcBun2A6IKBtbmh8yyCK4WBKgODk75V7ASj6ayArn-LiqTElgu53aiimS', series: 'CS161 — Stanford Engineering', duration: '35:00' });
  await ResourceChapter.insertMany([
    { resourceId: lib3._id, title: 'Recap: Single-Source Shortest Paths', timestamp: '0:00', orderIndex: 1, isWatched: true },
    { resourceId: lib3._id, title: 'Bellman-Ford Algorithm', timestamp: '4:30', orderIndex: 2, isWatched: true },
    { resourceId: lib3._id, title: 'Detecting Negative Cycles', timestamp: '12:15', orderIndex: 3, isWatched: true },
    { resourceId: lib3._id, title: 'Floyd-Warshall Algorithm', timestamp: '14:02', orderIndex: 4, isWatched: false },
    { resourceId: lib3._id, title: 'Applications & Analysis', timestamp: '22:00', orderIndex: 5, isWatched: false },
    { resourceId: lib3._id, title: 'Introduction to Linear Programming', timestamp: '28:30', orderIndex: 6, isWatched: false },
  ]);
  await ReadingProgress.create({ userId: student._id, resourceId: lib3._id, currentTime: '14:02', lastAccessed: new Date(Date.now() - 86400000) });

  const lib4 = await LibraryResource.create({ title: 'Computational Fluid Dynamics', slug: 'computational-fluid-dynamics', author: 'Dr. Alan Turing', year: '2023', type: 'textbook', category: 'Engineering', description: 'A comprehensive introduction to computational techniques used to solve fluid dynamics problems.', coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMWKB-UeVCRhFYdsr4N3ECbdlqTnXCLypJsEtsFJP6VbKj7vZrpOmB75TJ5TJbtuLkthcji9kSO5iPtQE7BP32rOnyei3DyCefNc5_ar_pWeBZfRisOE1Owe08CFcX5gk3F1BfdeTBVo3ay4VnRTDYQIcnh_NJl659uwqEMi9Cy-rsBzfRMJ4Jf_wctrRDYegY87U0lGwc9V_LNz6j1Zb22udpNz6unyAtX4aNtGqHHvKdsFIbgJG6r_UQOgwodvwM9SKkOKZHu44k', isbn: '978-0-521-84210-4', publisher: 'Cambridge University Press', pages: 520 });
  const lib5 = await LibraryResource.create({ title: 'The Future of AI Governance', slug: 'ai-governance', author: 'Global Policy Review', year: '2023', type: 'journal', category: 'Political Science', description: 'An analysis of current and proposed frameworks for governing artificial intelligence.', coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeeUhpyHPm_T9i8c55WuQ2WaHNB0iV3D9eaunNPEwfi9-t46EKIKHSh4YPRfT3SB-y285DxYvlLuFiwEDpA-iGUxjjl9jdthFCpmPZaEul2o5UyGXg6m7Pc7k89sQ7VxHs8CiuJyJFvPOT-GUVLGQgjxd_WPqIvlQfT13RakEPUVyE95QZv10X66Ov5P6e5cpk8AoE1XI4GSLXQgDilbncSDyHUQDDt-cz8hWxR3z-MH5yqWEAUWk2ayXzY7eLOm5SIozAuTg9Ivjk', issn: 'ISSN 2058-4016', publisher: 'Global Policy Review', pages: 28 });
  const lib6 = await LibraryResource.create({ title: 'Linear Algebra — Session 1', slug: 'linear-algebra-session-1', author: 'MIT OpenCourseWare', year: '2023', type: 'video_lecture', category: 'Mathematics', description: 'The geometry of linear equations: row picture and column picture.', coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmuiIE9TP9TiUUNPUwTdBp_z4tClOj-6zwFXEqjOZIDOEntTXUyjJhqaRrv0Dnba4E7lYLHaVeSn2Xwh_okFaMUj4tkekeyyxk1iy6miNu0cE_6nm_BXu_nzY_V6wIhf78x6bMwBMBkgz3_bHveYC8mdy3zC1e144WYTVaudsaF-XKsp6XseH1PCRIDX06x_BZUuC8YqGZQVaLXn6KCjTWcBun2A6IKBtbmh8yyCK4WBKgODk75V7ASj6ayArn-LiqTElgu53aiimS', series: '18.06 — MIT OCW', duration: '49:30' });

  await SavedCollection.create({
    userId: student._id,
    resourceIds: [lib1._id, lib2._id, lib3._id, lib4._id, lib5._id, lib6._id],
  });

  await Notification.insertMany([
    {
      userId: student._id,
      type: 'deadline',
      message: `${a1.title} is due soon.`,
      referenceId: a1._id,
      referenceType: 'assignment',
    },
    {
      userId: student._id,
      type: 'deadline',
      message: `${a5.title} deadline is in 2 days.`,
      referenceId: a5._id,
      referenceType: 'assignment',
    },
    {
      userId: student._id,
      type: 'grade',
      message: 'Your submission for Dynamic Programming Lab has been graded.',
      referenceId: sub2._id,
      referenceType: 'submission',
    },
    {
      userId: student._id,
      type: 'announcement',
      message: 'New course announcement posted in Advanced Algorithms & Data Structures.',
      referenceId: courseADS._id,
      referenceType: 'course',
    },
  ]);

  stats.libraryResources = 6;
  stats.resourceChapters = 18;
  stats.readingProgress = 3;
  stats.savedCollections = 1;
  stats.notifications = 4;

  console.log('✅ Database seeded successfully!');
  console.log('📊 Seed summary:', stats);
  console.log('📧 Student login: julian@scholarsync.edu / password123');
  console.log('📧 Instructor login: elena@scholarsync.edu / password123');
};

seed()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
  });
