import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { FORGET_REQUEST, LOGIN_REQUEST, LOGOUT_REQUEST, SIGNUP_REQUEST } from '../ActionType'
import { forgetAPI, logInAPI, logOutAPI, signUpAPI } from '../../common/api/auth.api'
import { authError, logOut, loginResponse, signupResponse } from '../action/auth.action'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* signUpUser(action) {
    console.log("jjjjj");
    try {
        const user = yield call(signUpAPI, action.payload)
        console.log(user);
        yield put(signupResponse(user.user))
    } catch (e) {
        yield put(authError(e.message))
        console.log(e);
    }
}

function* logInUser(action) {
    try {
        const user = yield call(logInAPI, action.payload.data)
        console.log(user);
        yield put(loginResponse(user.user))
    } catch (e) {
        yield put(authError(e.message))
        console.log(e);
    }
}


function* forgetUser(action) {
    try {
        const user = yield call(forgetAPI, action.payload)
        console.log(user);
    } catch (e) {
        yield put(authError(e.message))
        console.log(e);
    }
}

function* logOutUser(action) {
    console.log(action);
    try {
        const user = yield call(logOutAPI)
        console.log(user);
        yield put(logOut(user.user))
    } catch (e) {
        yield put(authError(e.message))
        console.log(e);
    }
}

function* watchSaga() {
    yield takeEvery(SIGNUP_REQUEST, signUpUser)
    yield takeEvery(LOGIN_REQUEST, logInUser)
    yield takeEvery(FORGET_REQUEST, forgetUser)
    yield takeEvery(LOGOUT_REQUEST, logOutUser)

}

export function* authSaga() {
    yield all([
        watchSaga()
    ])
}
