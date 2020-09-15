import { takeEvery, all } from 'redux-saga/effects'


import * as actionTypes from '../actions/actionTypes';
import { initiateLogoutSaga, checkAuthTimeOutSaga, authSaga, checkAuthStateSaga, } from './auth';
import { postOrderSaga, fetchOrderSaga } from './order';
import { initializeIngredientsSaga } from './burgerBuilder';


export function* watchAuthSaga() {
  yield all([
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, initiateLogoutSaga),
    yield takeEvery(actionTypes.CHECK_AUTHT_IMEOUT, checkAuthTimeOutSaga),
    yield takeEvery(actionTypes.AUTH_USER, authSaga),
    yield takeEvery(actionTypes.CHECK_AUTH_STATE, checkAuthStateSaga),
  ]);
 

}
export function* watchOrderSaga() {
  yield takeEvery(actionTypes.POST_ORDER, postOrderSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrderSaga);
}

export function* watchBurgerSaga() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initializeIngredientsSaga);

}


