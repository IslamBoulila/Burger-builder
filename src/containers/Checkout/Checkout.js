
import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';


class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                Salad: 0,
                Meat: 0,
                Cheese: 0,
            },
            price: null
        };
    }

    componentDidMount() {

        let query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price = null;
        for (let param of query.entries()) {
            if (param[0] === "price")
                price = param[1];
            else ingredients[param[0]] = +param[1];

        }
        //each enteri is like : ["key", "value"]

        this.setState({
            ingredients: ingredients,
            price:price,
        });
    }



    checkoutContinueHandler() {
        this.props.history.replace('/checkout/contact-data');
    }
    checkoutCancelHandler() {
        this.props.history.goBack();
    }

    render() {


        return (
            <>
                <CheckoutSummary ingredients={this.state.ingredients}
                    checkoutContinue={() => this.checkoutContinueHandler()}
                    checkoutCancelled={() => this.checkoutCancelHandler()}

                />

                <Route path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients}
                         price={this.state.price}    {...props}/>)}
                  
                />
            </>
        );


    }


}

export default Checkout;