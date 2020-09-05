import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}


export const authSuccess = (idToken, userId, timeOut) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            idToken: idToken,
            userId: userId,
        }
    }
}

export const authFail = (err) => {

    return {
        type: actionTypes.AUTH_FAIL,
        payload: {
            error: err,
        }
    }
}

export const checkAuthTimeOut = (timeout) => {
    return dispatch => setTimeout(() => {
        dispatch(logout());
    }, timeout * 1000);
}// BECAUSE THE TIMEWOUT WE GET FROM FIRE BASE (expiresIn) IS IN SECONDS and setTimesOut function expects ms.

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.LOG_OUT,
    }
}

export const auth = (email, password, isSignUp) => {

    return dispatch => {
        dispatch(authStart());

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSTYCEcN3FTXSLUvuk4XakKX81JG7Ww7U';
        if (isSignUp)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSTYCEcN3FTXSLUvuk4XakKX81JG7Ww7U';

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                const timeOut = response.data.expiresIn;
                const expirationDate = new Date(new Date().getTime() + timeOut * 1000);
                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("userId", response.data.localId);
                localStorage.setItem("expirationDate", expirationDate);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeOut(timeOut));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });


    }
}

export const setAuthRedirect = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        payload: {
            path: path
        }
    }
};

export const checkAuthState = () => {


    const token = localStorage.getItem("token");


    return dispatch => {
        if (token) {
            const timeOut = localStorage.getItem("timeOut");
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            const userId = localStorage.getItem("userId");
            if (expirationDate > new Date()) {
                dispatch(authSuccess(token, userId, expirationDate - new Date().getTime()));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logout());
            }
        } else dispatch(logout());
    };

}
