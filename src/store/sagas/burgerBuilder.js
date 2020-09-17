import { put, delay } from 'redux-saga/effects';


import axiosInstance from '../../axios-order';

import * as actionCreators from '../actions/index';

export function* initializeIngredientsSaga(action) {

    const response = yield axiosInstance.get('/ingredients.json');
    const ingredients={
        Salad:response.data['Salad']?response.data['Salad']:0,
        Tomato: response.data['Tomato']?response.data['Meat']:0,
        Cheese:response.data['Cheese']?response.data['Cheese']:0,
        Meat:response.data['Meat']?response.data['Meat']:0,
        
    };
    //*Initilize the ingredients and update the price
    try {
        yield put(actionCreators.setIngredients(ingredients));
    } catch (error) {
        yield put(actionCreators.fetchIngredientsFailed());
    }

}
