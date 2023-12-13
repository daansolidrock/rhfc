import service from './http'

export const getVideoTypeList = () => service.get('/videotype')
export const createVideoType = (data) => service.post('/videotype', data)
export const updateVideoType = (typeId, data) => service.put(`/videotype/${typeId}`, data)

export const getAdminVideoTypeList = () => service.get('/admin_videotype')