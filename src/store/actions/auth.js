import * as actionTypes from './actionTypes';


export const authStart= ()=>{
    return{
        type:actionTypes.AUTH_START,
    }
}


export const authSuccess= (email,password)=>{
    
    return{
        type:actionTypes.AUTH_SUCCESS,  
    }
}

export const authFail= (err)=>{
    
    return{
        type:actionTypes.AUTH_FAIL,
        payload:{
            error:err,
        }  
    }
}


export const auth= ()=>{
    
    return dispatch =>{
        dispatch (authStart());

    }
}

