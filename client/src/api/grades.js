import api from './client';

export const getGrades = () => api.get('/grades');
export const getGPA = () => api.get('/grades/gpa');
export const createGrade = (data) => api.post('/grades', data);
