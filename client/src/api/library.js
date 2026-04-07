import api from './client';

export const getResources = (params) => api.get('/library', { params });
export const getResource = (idOrSlug) => api.get(`/library/${idOrSlug}`);
export const createResource = (data) => api.post('/library', data);
export const getRecentResources = () => api.get('/library/recent');
export const updateProgress = (data) => api.put('/library/progress', data);
export const getSaved = () => api.get('/library/saved');
export const saveResource = (resourceId) => api.post('/library/saved', { resourceId });
