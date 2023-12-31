import { AUTH_ERROR, LOGIN_RESPONSE, LOGOUT, SIGNUP_REQUEST, SIGNUP_RESPONSE } from "../ActionType";


const initState = {
    isLoading: false,
    user: null,
    error: null
}


export const authReducer = (state = initState, action) => {
    console.log(action);

    switch (action.type) {
        case SIGNUP_REQUEST:
        case SIGNUP_RESPONSE:
            return {
                isLoading: false,
                user: null,
                error: null
            }
        case AUTH_ERROR:
            return {
                isLoading: false,
                user: null,
                error: action.payload
            }
        case LOGIN_RESPONSE:
            return {
                isLoading: false,
                user: action.payload,
                error: null
            }
        case LOGOUT:
            return {
                isLoading: false,
                user: null,
                error: null
            }
        default:
            return state
    }
}