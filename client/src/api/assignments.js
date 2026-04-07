import api from './client';

export const getAssignments = (params) => api.get('/assignments', { params });
export const getAssignment = (idOrSlug) => api.get(`/assignments/${idOrSlug}`);
export const createAssignment = (data) => api.post('/assignments', data);
export const updateAssignment = (id, data) => api.put(`/assignments/${id}`, data);
export const deleteAssignment = (id) => api.delete(`/assignments/${id}`);
