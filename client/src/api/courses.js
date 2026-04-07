import api from './client';

export const getCourses = (params) => api.get('/courses', { params });
export const getCourse = (idOrSlug) => api.get(`/courses/${idOrSlug}`);
export const getInstructorCourses = () => api.get('/courses/instructor/mine');
export const createCourse = (data) => api.post('/courses', data);
export const updateCourse = (id, data) => api.put(`/courses/${id}`, data);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);
export const addModule = (courseId, data) => api.post(`/courses/${courseId}/modules`, data);
export const addAnnouncement = (courseId, text) => api.post(`/courses/${courseId}/announcements`, { text });
