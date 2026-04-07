import api from './client';

export const getStudentDashboard = () => api.get('/dashboard/overview');
export const getInstructorDashboard = () => api.get('/dashboard/instructor');
export const getEnrollments = () => api.get('/enrollments');
export const enroll = (courseId) => api.post('/enrollments', { courseId });
export const createSubmission = (data) => api.post('/submissions', data);
export const getMySubmissions = () => api.get('/submissions/my');
export const getSubmissions = (params) => api.get('/submissions', { params });
