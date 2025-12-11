import api from './index';

export const createBooking = (payload) => api.post('/bookings', payload).then(r => r.data);
export const getBookingsByUser = (userId) => api.get(`/bookings/user/${userId}`).then(r => r.data);
