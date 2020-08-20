
import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                Salad: 1,
                Meat: 2,
                Cheese: 1,
            }
        };
    }



    checkoutContinueHandler() {
        this.props.history.replace('/checkout/contact-data');
    }
    checkoutCancelHandler() {
        this.props.history.goBack('/checkout/contact-data');
    }

    render() {


        return (
            <CheckoutSummary ingredients={this.state.ingredients}
                checkoutContinue={()=>this.checkoutContinueHandler()}
                checkoutCancelled={()=>this.checkoutCancelHandler()}

            />

        );


    }


}

export default Checkout;