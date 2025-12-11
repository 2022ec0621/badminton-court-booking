import api from './index';

export const getCoaches = () => api.get('/coaches').then(r => r.data);
export const updateCoach = (id, payload) => api.put(`/coaches/admin/${id}`, payload).then(r => r.data);
