import React from 'react';
import * as actions from './actions';
import {INGREDIENT_PRICES} from '../store/prices';

const initialState = {
    ingredients: {
        Salad: 1,
        Meat: 1,
        Cheese: 1
    },
  burgerTotalprice: 6,
};

const ingredientsReducer=(state=initialState,action)=>{
    switch (action.type){

            case actions.ADD_INGREDIENT:
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

                case actions.REMOVE_INGREDIENT:
                {    const updatedIngredients = { ...state.ingredients };
                updatedIngredients[action.payload.type] = updatedIngredients[action.payload.type] >= 0 ? updatedIngredients[action.payload.type] - 1 : 0
              
                    return {
                        ingredients: {
                            ...updatedIngredients
                        },
                        burgerTotalprice: state.burgerTotalprice - INGREDIENT_PRICES[action.payload.type]
                    };

                }

                case actions.INITIALIZE_INGREDIENT:
                    {   const  updatedState={...state};
                        Object.keys(state.ingredients).map(ingredient => {
            
                            if (state.ingredients[ingredient] !== 0)
                            updatedState.burgerTotalprice+= INGREDIENT_PRICES[ingredient];
                                
                        });
                        return updatedState;
                    }

              


                default: return state;
    }
}

export default ingredientsReducer;