import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart= ()=>{
    return{
        type:actionTypes.AUTH_START,
    }
}


export const authSuccess= (idToken,userId)=>{
    
    return{
        type:actionTypes.AUTH_SUCCESS, 
        payload:{
            idToken:idToken,
            userId:userId,
        } 
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

export const checkAuthTimeOut=(timeout)=>{
    return dispatch=> setTimeout( ()=>{
            dispatch(logout() );
    }, timeout*1000 );
}// BECAUSE THE TIMEWOUT WE GET FROM FIRE BASE (expiresIn) IS IN SECONDS and setTimesOut function expects ms.

export const logout=()=>{
   return {
    type:actionTypes.LOG_OUT,
   }
}

export const auth= (email,password,isSignUp)=>{
    
    return dispatch =>{
        dispatch (authStart());

       let  url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSTYCEcN3FTXSLUvuk4XakKX81JG7Ww7U';
        if(isSignUp)
        url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSTYCEcN3FTXSLUvuk4XakKX81JG7Ww7U';

        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        };
        axios.post(url,authData)
        .then(response =>{
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeOut(response.data.expiresIn));
        })
        .catch(error=>{
            dispatch(authFail(error.response.data.error));
        });
     

    }
}

