import api from './client';

export const login = (email, password) => api.post('/auth/login', { email, password });
export const signup = (data) => api.post('/auth/signup', data);
export const instructorLogin = (email, password) => api.post('/auth/instructor/login', { email, password });
export const instructorSignup = (data) => api.post('/auth/instructor/signup', data);
export const getMe = () => api.get('/auth/me');
