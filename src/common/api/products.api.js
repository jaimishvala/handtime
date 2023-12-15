import { addRequest, deleteRequest, getRequest, updateRequest } from "../request"

export const getProductsData = () => {
    return getRequest('products/')
}

export const addProductsData = (data) => {
    return addRequest('products/', data)
}

export const deleteProductsData = (id) => {
    return deleteRequest('products/', id)
}

export const updateProductsData = (data) => {
    return updateRequest('products/', data)
}