import React from 'react';
import * as actionTypes from '../actions/actionTypes';
import { INGREDIENT_PRICES } from '../prices';
import { updateObject } from '../utility';


const initialState = {
    ingredients: null,
    burgerTotalprice: 6,
    error: false
};

const addIngredients=(state,action)=>{

    const updatedIngredients = { ...state.ingredients };
    updatedIngredients[action.payload.type] = updatedIngredients[action.payload.type] + 1;
    const updatedPrice = state.burgerTotalprice + INGREDIENT_PRICES[action.payload.type];
    return updateObject(state, {ingredients: updatedIngredients, updatedPrice });
}
const removeIngredients=(state,action)=>{
    const updatedIngredients = { ...state.ingredients };
    updatedIngredients[action.payload.type] = updatedIngredients[action.payload.type] >= 0 ? updatedIngredients[action.payload.type] - 1 : 0;
    const updatedPrice = state.burgerTotalprice - INGREDIENT_PRICES[action.payload.type];

    return updateObject(state, {ingredients: updatedIngredients, updatedPrice });
}

const setIngredients=(state,action)=>   {
    const updatedState =
    {
        ...state,
        ingredients: action.payload.ingredients,
        burgerTotalprice: initialState.burgerTotalprice,

    };
    Object.keys(updatedState.ingredients).map(ingredient => {

        if (updatedState.ingredients[ingredient] !== 0)
            updatedState.burgerTotalprice += INGREDIENT_PRICES[ingredient];

    });

    return updatedState;
}


const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADD_INGREDIENT: return addIngredients(state,action);

        case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state,action);

        case actionTypes.SET_INGREDIENTS: return setIngredients(state,action);

        case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, { error: true });

        default: return state;
    }
}

export default ingredientsReducer;