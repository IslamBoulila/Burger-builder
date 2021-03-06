import * as actionTypes from './actionTypes';



export const purshaseBurgerInit = () => {
    return {
        type: actionTypes.PURSHASE_BURGER_INIT,
    }
}

export const postOrderSuccess = (id, orderData) => {

    return {
        type: actionTypes.POST_ORDER_SUCCESS,
        payload: {
            id: id,
            orderData: orderData,
        }
    }
}

export const postOrderFail = (error) => {
    return {
        type: actionTypes.POST_ORDER_FAIL,
        payload: {
            error,
        }
    }
}

export const postOrderStart = () => {
    return {
        type: actionTypes.POST_ORDER_START,
    }
}

export const postOrder = (orderData, token) => {
    return {
        type: actionTypes.POST_ORDER,
        payload: {
            orderData: orderData,
            token: token,
        }
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (fetchedOrders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: {
            orders: fetchedOrders,
        }
    }
}

export const fetchOrdersFail = () => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL
    }
}

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        payload: {
            token: token,
            userId: userId,
        }
    }

}