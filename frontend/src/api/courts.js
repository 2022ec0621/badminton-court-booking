import api from './index';

export const getCourts = () => api.get('/courts').then(r => r.data);
export const updateCourt = (id, payload) => api.put(`/courts/admin/${id}`, payload).then(r => r.data);
