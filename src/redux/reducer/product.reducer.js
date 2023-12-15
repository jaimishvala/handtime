import { ADD_PRODUCTS, DELETE_PRODUCTS, GET_PRODUCTS, UPDATE_PRODUCTS } from "../ActionType";

const initialState = {
    isLoading: false,
    products: [],
    error: null
}

export const productsReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }

        case ADD_PRODUCTS:
            return {
                ...state,
                products: state.products.concat(action.payload)
            }

        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: state.products.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v
                    }
                })
            }
        case DELETE_PRODUCTS:
            return {
                ...state,
                products: state.products.filter((v) => v.id !== action.payload)
            }

        default:
            return state
    }


}