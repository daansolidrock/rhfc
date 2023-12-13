import service from './http'

export const loginUser = (data) => service.post('/auth/login', data)

export const checkToken = () => service.get('/check_token')