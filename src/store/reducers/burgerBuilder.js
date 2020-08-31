import React from 'react';
import * as actionTypes from '../actions/actionTypes';
import {INGREDIENT_PRICES} from '../prices';

const initialState = {
    ingredients: null,
    burgerTotalprice: 6,
    error:false
};

const ingredientsReducer=(state=initialState,action)=>{
    switch (action.type){

            case actionTypes.ADD_INGREDIENT:
                {  
                    const updatedIngredients = {...state.ingredients };
                updatedIngredients[action.payload.type] = updatedIngredients[action.payload.type] + 1
                    return {
                        ingredients: {
                            ...updatedIngredients
                        },
                        burgerTotalprice: state.burgerTotalprice + INGREDIENT_PRICES[action.payload.type]
                    };

                }

                case actionTypes.REMOVE_INGREDIENT:
                {    const updatedIngredients = { ...state.ingredients };
                updatedIngredients[action.payload.type] = updatedIngredients[action.payload.type] >= 0 ? updatedIngredients[action.payload.type] - 1 : 0
                    return {
                        ingredients: {
                            ...updatedIngredients
                        },
                        burgerTotalprice: state.burgerTotalprice - INGREDIENT_PRICES[action.payload.type]
                    };

                }
                case actionTypes.SET_INGREDIENTS:
                    {   const  updatedState=
                        {...state,
                            ingredients:  action.payload.ingredients,
                        };
                        Object.keys(updatedState.ingredients).map(ingredient => {
            
                            if (updatedState.ingredients[ingredient] !== 0)
                            updatedState.burgerTotalprice+= INGREDIENT_PRICES[ingredient];
                                
                        });
                        
                        return updatedState;
                    }
                    
                    case actionTypes.FETCH_INGREDIENTS_FAILED:
                         return {
                             ...state,
                             error:true,
                         }

                default: return state;
    }
}

export default ingredientsReducer;