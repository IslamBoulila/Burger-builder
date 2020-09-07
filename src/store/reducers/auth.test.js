import React from 'react';
import {configure ,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import authReducer from './auth';
import * as actionTypes from '../actions/actionTypes';

configure({adapter:new Adapter()});

describe('Auth reducer', ()=>{
    let  initialState;
  
    beforeEach(()=>{
          initialState = {
            error:null,
            loading:false,
            userId:null,
            idToken:null,
            redirectPath:'/'
         };

    });
    /* Test 1 */
    it('Should return the initial state',()=>{
        expect(  authReducer (undefined  , {} )  ).toEqual(initialState);
    });

     /* Test 2 : authentication successful*/

    it('Should return the a state with some userId & some userToken upon login',()=>{
        expect(  authReducer (undefined  , {
            type:actionTypes.AUTH_SUCCESS,
            payload:{
                userId:"some_userId",
            idToken:"some_userToken",
            }
        } )  ).toEqual( {
            ...initialState,
            error:null,
            loading:false,
            userId:"some_userId",
            idToken:"some_userToken",
        });
    });

    /* Test 3 Start Authentication */

    it('Should return the the state with loading set to false',()=>{
        expect(  authReducer (undefined  , {type:actionTypes.AUTH_START} )  ).toEqual({
            ...initialState,
            loading:true,
        });
    });
    
});

