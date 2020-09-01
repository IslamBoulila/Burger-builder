import * as actionTypes from '../actions/actionTypes';

const initialState={
    orders:[],
    error:null,
    loading:false,
    purshased:false,
}

const orderReducer=( state = initialState,action)=>{
    switch (action.type){

        
        case actionTypes.PURSHASE_BURGER_INIT:
            return {
            ...state,
            purshased:false,
             }

          case actionTypes.POST_ORDER_START:
                return {
                ...state,
                loading:true,
                 }
            case actionTypes.POST_ORDER_SUCCESS:
                const newOrder={
                    id:action.payload.id,
                    orderData:action.payload.orderData,
                   
                };
                return {
                    ...state,
                    loading:false,
                    orders:state.orders.concat(newOrder),
                    purshased:true,
                }

            case actionTypes.POST_ORDER_FAIL:
                return {
                    ...state,
                    loading:false,
                    error:action.payload.error
                }

                case actionTypes.FETCH_ORDERS_START:
                return {
                    ...state,
                    loading:true,
                }

                case actionTypes.FETCH_ORDERS_SUCCESS:
                return {
                    ...state,
                    orders:action.payload.orders,
                    loading:false,
                }

                case actionTypes.FETCH_ORDERS_FAIL:
                    return {
                        ...state,
                        loading:false,
                    }

            default: return state;
    }
}

export default orderReducer;
