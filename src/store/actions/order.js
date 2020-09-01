import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-order';




export const purshaseBurgerInit =()=>{
    return{
        type:actionTypes.PURSHASE_BURGER_INIT,
    }
}

export const postOrderSuccess= (id,orderData)=>{
    
        return{
            type:actionTypes.POST_ORDER_SUCCESS,
            payload:{
                id:id,
                orderData:orderData,
            }
        }
}

export const postOrderFail= (error)=>{
            return{
                type:actionTypes.POST_ORDER_FAIL,
                payload:{
                    error,
                }
            }
}

export const postOrderStart= ()=>{
    return {
        type: actionTypes.POST_ORDER_START,
    }
}
export const postOrder= (orderData)=>{
        return dispatch=>{
            dispatch(postOrderStart());
            axiosInstance.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(postOrderSuccess(response.data.name , orderData));
            })
            .catch(error => {
                dispatch(postOrderFail(error ));
            });
        };
}


export  const fetchOrdersStart=() =>{
    return {
        type:actionTypes.FETCH_ORDERS_START
    }
}


export  const fetchOrdersSuccess=(fetchedOrders) =>{
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        payload:{
            orders:fetchedOrders,
        }
    }
}

export  const fetchOrdersFail=() =>{
    return {
        type:actionTypes.FETCH_ORDERS_FAIL
    }
}

export  const fetchOrders=() =>{
    return dispatch=>{
        dispatch(fetchOrdersStart());

        axiosInstance.get('/orders.json')
        .then(response => {
           const orders=[];
          for(let key in response.data){
            orders.push( {
                ...response.data[key],
                id:key,
            }   );
          }
          dispatch(fetchOrdersSuccess(orders));
        })
        .catch(error=>{
            dispatch( fetchOrdersFail());
        });
    }
        
}