import { addRequest, deleteRequest, getRequest, updateRequest } from "../request"


export const getWatchCatData = () => {
    return getRequest('watchcat/')
}

export const addWatchCatData = (data) => {
    return addRequest('watchcat/', data)
}

export const deleteWatchCatData = (id) => {
    return deleteRequest('watchcat/', id)
}

export const updateWatchCatData = (data) => {
    return updateRequest('watchcat/', data)
}