import { API_URL } from "../../utils/baseURL";
import { ADD_PRODUCTS, DELETE_PRODUCTS, GET_PRODUCTS, UPDATE_PRODUCTS } from "../ActionType"


export const getProduct = () => (dispatch) => {
    try {
        setTimeout(() => {
            fetch(API_URL + "products")
                .then((response) => {
                    console.log(response);
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('getMedicine went wrong!')
                })
                .then(data => dispatch({ type: GET_PRODUCTS, payload: data }))
                .catch(error => console.log(error))
        }, 1000)
    } catch (error) {
        console.log(error);
    }
}

export const addProduct = (data) => (dispatch) => {

    try {
        fetch(API_URL + "products", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('addProduct went wrong!')
            })
            .then((rdata) => dispatch({ type: ADD_PRODUCTS, payload: rdata }))
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error);
    }
}


export const deleteProduct = (id) => (dispatch) => {
    console.log(id);
    try {
        fetch(API_URL + "products/" + id, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(() => dispatch({ type: DELETE_PRODUCTS, payload: id }))
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = (data) => (dispatch) => {
    try {
        fetch(API_URL + "products/" + data.id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then((rdata) => dispatch({ type: UPDATE_PRODUCTS, payload: rdata }))
            .catch(error => console.log(error))

    } catch (error) {
        console.log(error);
    }

}