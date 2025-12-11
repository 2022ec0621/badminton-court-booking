import api from './index';
export const getEquipment = () => api.get('/equipment').then(r => r.data);
