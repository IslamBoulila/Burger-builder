
import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class Checkout extends Component {

    constructor(props) {
        super(props);
       
    }

    componentDidMount() {

        // let query = new URLSearchParams(this.props.location.search);
        // let ingredients = {};
        // let price = null;
        // for (let param of query.entries()) {
        //     if (param[0] === "price")
        //         price = param[1];
        //     else ingredients[param[0]] = +param[1];

        // }
        // //each enteri is like : ["key", "value"]

        // this.setState({
        //     ingredients: ingredients,
        //     price: price,
        // });
    }



    checkoutContinueHandler() {
        this.props.history.replace('/checkout/contact-data');
    }
    checkoutCancelHandler() {
        this.props.history.goBack();
    }

    render() {
        let summury=<Redirect to ="/"/>;
        if(this.props.ingredients){
            let purshasedRedirect=this.props.purshased?<Redirect to ='/' />:null;
            summury= 
            <>
             {purshasedRedirect}
             <CheckoutSummary 
                 ingredients={this.props.ingredients}
                 checkoutContinue={() => this.checkoutContinueHandler()}
                 checkoutCancelled={() => this.checkoutCancelHandler()}
             />
            <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
        </>;
        }

        return summury;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredientsRed.ingredients,
        price:state.ingredientsRed.burgerTotalprice,
        purshased:state.orderReducer.purshased,
    };
};


export default connect(mapStateToProps)(Checkout);