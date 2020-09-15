import {put ,delay, all} from 'redux-saga/effects';
import axios from 'axios';


import * as actionCreators from '../actions/index'; 

export function* initiateLogoutSaga(action){

    yield localStorage.removeItem("token");
    yield localStorage.removeItem("userId");
    yield localStorage.removeItem("expirationDate");
    yield put(actionCreators.logoutSuccess());
    
}

export function* checkAuthTimeOutSaga(action) {
    yield delay(action.payload.timeOut*1000);
    yield put(actionCreators.logout());
}

export function*  authSaga(action){
   
    yield put(actionCreators.authStart());

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSTYCEcN3FTXSLUvuk4XakKX81JG7Ww7U';
    if (action.payload.isSignUp)
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSTYCEcN3FTXSLUvuk4XakKX81JG7Ww7U';

    const authData = {
        email: action.payload.email,
        password: action.payload.password,
        returnSecureToken: true
        };

    try{
         // since we use yield we no more need .then... .catch
           const response =  yield axios.post(url, authData);
            const timeOut = response.data.expiresIn;
        const expirationDate = new Date(new Date().getTime() + timeOut * 1000);
        yield all([
             localStorage.setItem("token", response.data.idToken),
             localStorage.setItem("userId", response.data.localId),
             localStorage.setItem("expirationDate", expirationDate),
        ]);
        yield put(actionCreators.authSuccess(response.data.idToken, response.data.localId));
        yield put(actionCreators.checkAuthTimeOut(timeOut));

        }catch(error){
            yield put (actionCreators.authFail(error.response.data.error));
        }
       
   

        /*axios.post(url, authData)
            .then(response => {
                
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
            });*/
}

export  function* checkAuthStateSaga(action){
    const token = yield localStorage.getItem("token");

    if (token) {  
        const expirationDate = yield new Date(localStorage.getItem("expirationDate"));
        const userId = yield localStorage.getItem("userId");
            if (expirationDate > new Date()) {
                yield put(actionCreators.authSuccess(token, userId, expirationDate - new Date().getTime()));
                yield put(actionCreators.checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                yield put(actionCreators.logout());
            }
        } else yield  put(actionCreators.logout());

}

    


