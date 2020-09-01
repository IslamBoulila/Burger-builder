import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';



const initialState = {
    orders: [],
    error: null,
    loading: false,
    purshased: false,
}


const purchaseBurgerSuccess=(state,action)=>{
    return updateObject(state, { purshased: false });
}

const postOrderStart=(state,action)=>{
    return updateObject(state, { loading: true })
}

const postOrderSuccess=(state,action)=>{
    const newOrder = {
        id: action.payload.id,
        orderData: action.payload.orderData,

    };
    return updateObject(state,
        {
            loading: false,
            orders: state.orders.concat(newOrder),
            purshased: true,
        });
}
const postOrderFail=(state,action)=>{
    return updateObject(state, {
        loading: false,
        error: action.payload.error
    });
}
const fetchOrdersStart=(state,action)=>{
    return updateObject(state, { loading: true });
}

const fetchOrdersSuccess=(state,action)=>{
    return updateObject(state, { orders: action.payload.orders, loading: false, });
}

const fetchOrdersFail=(state,action)=>{
    return updateObject(state, { loading: false, });
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.PURSHASE_BURGER_INIT: return purchaseBurgerSuccess(state,action);
           
        case actionTypes.POST_ORDER_START: return postOrderStart(state,action);
        
        case actionTypes.POST_ORDER_SUCCESS: return  postOrderSuccess(state,action);
           
        case actionTypes.POST_ORDER_FAIL:return  postOrderFail(state,action);
           
        case actionTypes.FETCH_ORDERS_START:  return fetchOrdersStart(state,action);

        case actionTypes.FETCH_ORDERS_SUCCESS:return fetchOrdersSuccess(state,action);
           
        case actionTypes.FETCH_ORDERS_FAIL: return  fetchOrdersFail(state,action);
           
        default: return state;
    }
}

export default orderReducer;
