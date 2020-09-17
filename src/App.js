import React, { Component, lazy, Suspense, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';

import Logout from './containers/Auth/Logout/Logout';

import * as actionCreators from './store/actions/index';



const lazyAuth = lazy(() => import('./containers/Auth/Auth'));
const lazyCheckout = lazy(() => import('./containers/Checkout/Checkout'));
const lazyOrders = lazy(() => import('./containers/Orders/Orders'));


const App = props => {
  const { onTryAutoSignIn} = props;

  useEffect(() => {
    onTryAutoSignIn();

  }, [onTryAutoSignIn]);



  let routes = <Switch>
    <Route path="/auth" component={lazyAuth} />
    <Route path="/" exact component={BurgerBuilder} />
    <Redirect to="/" />
  </Switch>;
  if (props.isAuth) {
    routes = <Switch>

      <Route path="/logout" component={Logout} />
      <Route path="/checkout" component={lazyCheckout} />
      <Route path="/auth" component={lazyAuth} />
      <Route path="/orders" component={lazyOrders} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  }

  return (
    <div className="">
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          {routes}
        </Suspense>

      </Layout>

    </div>
  );


}


const mapstateToProps = (state) => {
  return {
    isAuth: state.authReducer.idToken != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignIn: () => dispatch(actionCreators.checkAuthState()),
  };
};

export default connect(mapstateToProps, mapDispatchToProps)(App);
