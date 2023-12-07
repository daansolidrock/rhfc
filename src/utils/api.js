import { getVideoTypeList, createVideoType, updateVideoType } from './apiVideoType.js'
import { getDonate, createDonate, updateDonate } from './apiDonate.js'
import { getQuestion, createQuestion, updateQuestion } from './apiQuestion.js'


export const apiGetVideoTypeList = getVideoTypeList
export const apiCreateVideoType = createVideoType
export const apiUpdateVideoType = updateVideoType


export const apiGetDonate = getDonate
export const apiCreateDonate = createDonate
export const apiUpdateDonate = updateDonate

export const apiGetQuestion = getQuestion
export const apiCreateQuestion = createQuestion
export const apiUpdateQuestion = updateQuestion