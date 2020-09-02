import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart= ()=>{
    return{
        type:actionTypes.AUTH_START,
    }
}


export const authSuccess= (responseData)=>{
    
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
            dispatch(authSuccess(response.data));
        })
        .catch(error=>{
            console.log(error);
            dispatch(authFail(error));
        });
     

    }
}

