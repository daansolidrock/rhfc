import service from './http'

export const getVideoList = () => service.get('/videotype')
export const getVideoByType = (selected) => service.get(`/list/?type_name=${selected}`)
export const getVideoNewest = () => service.get('/newest')
export const createVideo = (data) => service.post('/list', data)
export const updateVideo = (id, data) => service.put(`/list/${id}`, data)


export const getAdminVideList = () => service.get('/admin_lists')
