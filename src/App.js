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


class App extends Component {

    componentDidMount(){
      this.props.onTryAutoSignIn();
    }
  render() {
    return (
      <div className="">
        <Layout>
        <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
        </Switch>
        </Layout>

       

      </div>
    );
  }

}


const mapDispatchToProps = (dispatch)=>{
  return {
    onTryAutoSignIn : ()=> dispatch(actionCreators.checkAuthState()),
  };
};

export default  connect(null,mapDispatchToProps ) (App);
