import React from 'react';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';




const initialState = {
   error:null,
   loading:false,
   userId:null,
   idToken:null
};

const authStart=(state,action)=>{
    return updateObject(state,{error:null,loading:true});
};

const authSuccess=(state,action)=>{
    return updateObject(state,
        {error:null,
        loading:false,
        userId:action.payload.userId,
        idToken:action.payload.idToken,
    });
};

const authFail = (state,action)=>{
    return updateObject(state,{error:action.payload.error,loading:false});
};

const logOut=(state,action)=>{
    return updateObject(state,{userId:null,idToken:null});
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.AUTH_START: return authStart(state,action);

        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);

        case actionTypes.AUTH_FAIL:  return authFail(state, action);
        case actionTypes.LOG_OUT:  return logOut(state, action);

        default: return state;
    }
}
export  default authReducer;