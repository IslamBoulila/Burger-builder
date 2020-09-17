import * as actionTypes from './actionTypes';


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
    return {
        type:actionTypes.CHECK_AUTHT_IMEOUT,
        payload:{
            timeOut:timeout
        }
    } 
}
// BECAUSE THE TIMEWOUT WE GET FROM FIRE BASE (expiresIn) IS IN SECONDS and setTimesOut function expects ms.

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT,
    }
}
export const logoutSuccess = () => {
    return {
        type: actionTypes.LOG_OUT,
    }
}

export const auth = (email, password, isSignUp) => {
    return {
        type: actionTypes.AUTH_USER,
        payload:{
            email:email,
            password:password,
            isSignUp:isSignUp
        }
    };
};

export const setAuthRedirect = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        payload: {
            path: path
        }
    }
};

export const checkAuthState = () => {
    return {
        type:actionTypes.CHECK_AUTH_STATE,
    }

}
