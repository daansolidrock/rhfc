import service from './http'

export const getQuestion = () => service.get('/questions')
export const createQuestion = (data) => service.post('/question', data)
export const updateQuestion = (id, data) => service.put(`/question/${id}`, data)

