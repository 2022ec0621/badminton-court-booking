import api from './index';

export const getPricingRules = () => api.get('/pricing-rules').then(r => r.data);
export const createPricingRule = (payload) => api.post('/pricing-rules/admin', payload).then(r => r.data);

