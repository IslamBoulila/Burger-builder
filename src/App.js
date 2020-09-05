import React, { Component } from 'react';
import Layout from './components/layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { Switch,Route } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actionCreators from './store/actions/index';
import {Redirect} from 'react-router-dom';


class App extends Component {

    componentDidMount(){
      this.props.onTryAutoSignIn();
    }
  render() {
    let routes =  <Switch>
                      <Route path="/auth" component={Auth} />
                      <Route path="/" exact component={BurgerBuilder} />
                      <Redirect to ="/" />
                  </Switch>;
      if( this.props.isAuth){
        routes= <Switch>
               
                      <Route path="/logout" component={Logout} />
                      <Route path="/checkout" component={Checkout} />
                       <Route path="/orders" component={Orders} />
                       <Route path="/" exact component={BurgerBuilder} />
                       <Redirect to ="/" />
                  </Switch>
      }
     
    return (
      <div className="">
        <Layout>
       {routes}
        </Layout>

      </div>
    );
  }

}


const mapstateToProps = (state)=>{
  return {
   isAuth:  state.authReducer.idToken!=null,
  };
};

const mapDispatchToProps = (dispatch)=>{
  return {
    onTryAutoSignIn : ()=> dispatch(actionCreators.checkAuthState()),
  };
};

export default  connect(mapstateToProps,mapDispatchToProps ) (App);
