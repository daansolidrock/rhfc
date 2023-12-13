import service from './http'

export const getFileTypeList = () => service.get('/filetype')
export const createFileType = (data) => service.post('/filetype', data)
export const updateFileType = (typeId, data) => service.put(`/filetype/${typeId}`, data)
