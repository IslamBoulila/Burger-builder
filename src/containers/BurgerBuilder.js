import React, { Component } from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/OrderSummary/OrderSummary';
import axiosInstance from '../axios-order';

import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandeling from '../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import {INGREDIENT_PRICES} from '../store/prices';

import * as actionCreators from '../store/actions/index';

/*const INGREDIENT_PRICES = {
    Salad: 4.5,
    Meat: 15,
    Cheese: 4.3
}*/

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
       // loading: false,
      
    }
    /*
    My version of addIngredients using prevState
    addIngredientHandler = (type) => {

        this.setState((prevState) => ({
            ingredients: {
                ...prevState.ingredients,
                [type]: prevState.ingredients[type] + 1
            },
            burgerTotalprice: prevState.burgerTotalprice + INGREDIENT_PRICES[type]
        }));

        this.updatePurchasable();

    }

    */

 /**
  * 
  * @param {*} updatedIngredients 
  * This function will return true or false to active or disable the order button
  * The logic is cheking whether the total price is >0 ot not.
  */
    updatePurchasable = (updatedIngredients) => {

        let sum = Object.keys(updatedIngredients).map(igKey => (updatedIngredients[igKey]))
            .reduce((ingredientSum, ingredientCount) => {
                return ingredientSum + ingredientCount;
            }, 0);

       return  sum > 0 ;
    }

    purshasingHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purshasingCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
    //     this.setState({ loading: true });

    //     const orderData = {
    //         ingredients: this.state.ingredients,
    //         price: this.state.price,
    //         customer: {
    //             name: 'Oussama',
    //             address: {
    //                 city: 'Oujda',
    //                 postalCode: '60500',
    //             },
    //             email: 'tes@test.com',

    //         },
    //         price: this.state.burgerTotalprice,
    //         deliveryMethod: 'fastest'
    //     }
    //     axiosInstance.post('/orders.json', orderData)
    //         .then(response => {

    //             this.setState({ loading: false, purchasing: false });

    //         })
    //         .catch(error => {
    //             this.setState({ loading: false, purchasing: false });
    //         });

   
    //let i in .. provides us with the keys of the object
    //let i for .. provides us with the values of the object coresponding to the keys
    

    this.props.history.push( '/checkout' )
     }

    // initilizingTheIngredients=(databaseIngredients)=>{
    //   //  this.setState({ingredients:databaseIngredients});

    //     Object.keys(this.state.ingredients).map(ingredient => {
            
    //         if (this.state.ingredients[ingredient] !== 0){
    //             this.setState({ burgerTotalprice: this.state.burgerTotalprice + INGREDIENT_PRICES[ingredient]
    //             });
    //             this.updatePurchasable(databaseIngredients);
    //         }
           
    //     });
   
    // }

    componentDidMount() {
      
     this.props.onInitilizeIngredients();

        // axiosInstance.get('/ingredients.json')
        //     .then(response => {
        //         //*Initilize the ingredients and update the price
        //         this.initilizingTheIngredients(response.data);

        //     })
        //     .catch(error=>{});


    }

    render() {
        const ingredients = this.props.ingredients;

        const disabledButtons = {
            ...this.props.ingredients
        }
        for (let key in disabledButtons) {
            disabledButtons[key] = disabledButtons[key] <= 0
        }

        //Show loading spinner
        let orderSummary = null;
        if (this.props.ingredients) {
            orderSummary = <OrderSummary ingredients={this.props.ingredients}
                clancelOrder={this.purshasingCancelHandler}
                continueOrder={this.purchaseContinueHandler}
                price={this.props.burgerTotalprice} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }


        let burger =  this.props.error? <p>Ingredients can't be loaded</p> :<Spinner />;
        if (this.props.ingredients) {
            burger = (<>
                <Burger ingredients={ingredients} />
                <BuildControls ingredients={ingredients}
                    add={this.props.onAddIngredient}
                    remove={this.props.onRemoveIngredient}
                    disabledButtons={disabledButtons}
                    price={this.props.burgerTotalprice}
                    purchasable={this.updatePurchasable(this.props.ingredients)}
                    orderButtonHandler={this.purshasingHandler}
                />
            </>);

        }

        return (
            <>

                <Modal show={this.state.purchasing} modalClosed={this.purshasingCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </>
        );
    }

}


const  mapStateToProps=(state)=>{
        return{
            ingredients:state.ingredientsRed.ingredients,
            burgerTotalprice: state.ingredientsRed.burgerTotalprice,
            error:state.ingredientsRed.error
        };
};

const  mapDispatchToProps=(dispatch)=>{
    return{
        onAddIngredient: (ingredient)=>dispatch(actionCreators.addIngredient(ingredient)),
        onRemoveIngredient: (ingredient)=>dispatch(actionCreators.removeIngredient(ingredient)),
        onInitilizeIngredients:   ()=>   dispatch(actionCreators.initializeIngredients()),
    };
};


export default withErrorHandeling(React.memo(
    
   connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder)

    ), axiosInstance);