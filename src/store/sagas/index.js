import {takeEvery}  from 'redux-saga/effects'


import * as actionTypes from '../actions/actionTypes';
import {initiateLogoutSaga, checkAuthTimeOutSaga,authSaga,checkAuthStateSaga} from './auth';


export function* watchAuthSaga() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, initiateLogoutSaga);
    yield takeEvery(actionTypes.CHECK_AUTHT_IMEOUT, checkAuthTimeOutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authSaga);
    yield takeEvery(actionTypes.CHECK_AUTH_STATE,checkAuthStateSaga);

  }

 