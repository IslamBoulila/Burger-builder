import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-order';

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

export const setIngredients=(ingredients)=>{
    return {
        type:actionTypes.SET_INGREDIENTS,
        payload:{
            ingredients:ingredients,
        }
    }
};

export const  fetchIngredientsFailed=()=>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED,
    }
};

export const initializeIngredients=()=>{
  return {
      type:actionTypes.INIT_INGREDIENTS
  }
}


