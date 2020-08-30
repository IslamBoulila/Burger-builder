import * as actionTypes from './actionTypes';

export const addIngredient=(ingredient)=>{
    return {
        type:actionTypes.ADD_INGREDIENT,
         payload:{type:ingredient}
        }
}

export const removeIngredient=(ingredient)=>{
    return {
        type:actionTypes.REMOVE_INGREDIENT,
         payload:{type:ingredient}
        }
}

export const initializeIngredients=()=>{
    return {
        type:actionTypes.INITIALIZE_INGREDIENTS 
        }
}


