import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {createStore, combineReducers, applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';


import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import './index.css';
import App from './App';
import {watchAuthSaga} from './store/sagas/index';

const rootReducer = combineReducers(
  { ingredientsRed : burgerBuilderReducer,
    orderReducer : orderReducer,
    authReducer:authReducer,

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
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV==='development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer,composeEnhancers(
  applyMiddleware(loggerMiddleware ,thunk, sagaMiddleware )  ) ); 

sagaMiddleware.run(watchAuthSaga);

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
