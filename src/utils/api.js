import { loginUser, checkToken } from './apiAuth.js'
import { getVideoList, getVideoByType, getVideoNewest, createVideo, updateVideo, getAdminVideList } from './apiVideo.js'
import { getVideoTypeList, createVideoType, updateVideoType, getAdminVideoTypeList } from './apiVideoType.js'
import { getDonate, createDonate, updateDonate } from './apiDonate.js'
import { getQuestion, createQuestion, updateQuestion } from './apiQuestion.js'
import { getFileTypeList, createFileType, updateFileType } from './apiFileType.js'

export const apiLoginuser = loginUser
export const apiCheckToken = checkToken

export const apiGetVideoList = getVideoList
export const apiGetVideoByType = getVideoByType
export const apiGetVideoNewest = getVideoNewest
export const apiCreateVideo = createVideo
export const apiUpdateVideo = updateVideo
export const apiGetAdminVideList = getAdminVideList

export const apiGetVideoTypeList = getVideoTypeList
export const apiGetAdminVideoTypeList = getAdminVideoTypeList
export const apiCreateVideoType = createVideoType
export const apiUpdateVideoType = updateVideoType


export const apiGetDonate = getDonate
export const apiCreateDonate = createDonate
export const apiUpdateDonate = updateDonate

export const apiGetQuestion = getQuestion
export const apiCreateQuestion = createQuestion
export const apiUpdateQuestion = updateQuestion

export const apiGetFileTypeList = getFileTypeList
export const apiCreateFileType = createFileType
export const apiUpdateFileType = updateFileType