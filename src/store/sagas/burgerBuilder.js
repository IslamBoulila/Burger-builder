import { put, delay } from 'redux-saga/effects';


import axiosInstance from '../../axios-order';

import * as actionCreators from '../actions/index';

export function* initializeIngredientsSaga(action) {

    const response = yield axiosInstance.get('/ingredients.json');
    //*Initilize the ingredients and update the price
    try {
        yield put(actionCreators.setIngredients(response.data));
    } catch (error) {
        yield put(actionCreators.fetchIngredientsFailed());
    }

}
