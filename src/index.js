import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ingredientReducer from './store/ingredientReducer';


const rootReducer = combineReducers(
  {ingredientsRed: ingredientReducer,

});
const loggerMiddleware= store =>{
    return next => {

        return action => {
               console.log('[logger Middleware ]',action);
               //This fucntion will let the action to reache the reducer
               next(action);
               console.log('[logger Middleware ]',store.getState());
        }
    }
};
const store = createStore(rootReducer,applyMiddleware(loggerMiddleware)); 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
      </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
