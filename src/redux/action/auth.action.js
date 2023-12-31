import { AUTH_ERROR, FORGET_REQUEST, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT, LOGOUT_REQUEST, SIGNUP_REQUEST, SIGNUP_RESPONSE } from "../ActionType";

export const signupRequest = (data) => (dispatch) => {
    console.log(data);
    dispatch({ type: SIGNUP_REQUEST, payload: data })
}

export const signupResponse = (data) => (dispatch) => {
    console.log(data);
    dispatch({ type: SIGNUP_RESPONSE, payload: data })
}

export const authError = (data) => (dispatch) => {
    dispatch({ type: AUTH_ERROR, payload: data })
}

export const loginRequest = (data) => (dispatch) => {
    console.log(data);
    dispatch({ type: LOGIN_REQUEST, payload: data })
}

export const loginResponse = (data) => (dispatch) => {
    console.log(data);
    dispatch({ type: LOGIN_RESPONSE, payload: data })
}

export const forgetRequest = (data) => (dispatch) => {
    console.log(data);
    dispatch({ type: FORGET_REQUEST, payload: data })
}


export const logoutRequest = () => (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST })
}

export const logOut = () => (dispatch) => {
    dispatch({ type: LOGOUT })
}