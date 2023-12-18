import { addRequest, deleteRequest, getRequest, updateRequest } from "../request"


export const getWatchData = () => {
    return getRequest('watch/')
}

export const addWatchData = (data) => {
    return addRequest('watch/', data)
}

export const deleteWatchData = (id) => {
    return deleteRequest('watch/', id)
}

export const updateWatchData = (data) => {
    return updateRequest('watch/', data)
}