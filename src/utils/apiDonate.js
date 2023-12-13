import service from './http'

export const getDonate = () => service.get('/donates')
export const createDonate = (data) => service.post('/donate', data)
export const updateDonate = (id, data) => service.put(`/donate/${id}`, data)