import { put, delay } from 'redux-saga/effects';


import axiosInstance from '../../axios-order';
import * as actionCreators from '../actions/index';


export function* postOrderSaga(action) {

    yield put(actionCreators.postOrderStart());
    try {
        const response = yield axiosInstance.post('/orders.json?auth=' + action.payload.token, action.payload.orderData);
        yield put(actionCreators.postOrderSuccess(response.data.name, action.payload.orderData));
    } catch (error) {
        yield put(actionCreators.postOrderFail(error));
    }
}

export function* fetchOrderSaga(action) {
     const token =  action.payload.token;
     const userId =  action.payload.userId;
    try {
        yield put(actionCreators.fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="customer/id"&equalTo="' + userId + '"';
        const response = yield axiosInstance.get('/orders.json' + queryParams);
        const orders = [];
        for (let key in response.data) {
            orders.push({
                ...response.data[key],
                id: key,
            });
        }
        yield put(actionCreators.fetchOrdersSuccess(orders));
    } catch (error) {
        yield put(actionCreators.fetchOrdersFail());
    }

}