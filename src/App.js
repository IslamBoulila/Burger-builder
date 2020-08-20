import React, { Component } from 'react';
import Layout from './components/layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Switch,Route } from 'react-router-dom';


class App extends Component {


  render() {
    return (
      <div className="">
        <Layout>
        <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/" component={BurgerBuilder} />
        </Switch>
        </Layout>

       

      </div>
    );
  }

}

export default App;
