import React, { Component } from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/OrderSummary/OrderSummary';
import axiosInstance from '../axios-order';
import { object } from 'prop-types';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandeling from '../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    Salad: 4.5,
    Meat: 15,
    Cheese: 4.3
}

class BurgerBuilder extends Component {

    state = {
        /* ingredients: {
             Salad: 0,
             Meat: 0,
             Cheese: 0
         },*/

        //Now we are fetching ingredients from DB
        ingredients: null,
        burgerTotalprice: 6,
        purchasable: false,
        purchasing: false,
        loading: false,

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

    addIngredientHandler = (type) => {
        
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedIngredients[type] + 1
        this.setState({
            ingredients: {
                ...updatedIngredients
            },
            burgerTotalprice: this.state.burgerTotalprice + INGREDIENT_PRICES[type]
        });
        this.updatePurchasable(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedIngredients[type] >= 0 ? updatedIngredients[type] - 1 : 0
        this.setState({
            ingredients: {
                ...updatedIngredients
            },
            burgerTotalprice: this.state.burgerTotalprice - INGREDIENT_PRICES[type]
        });
        this.updatePurchasable(updatedIngredients);

    }

    updatePurchasable = (updatedIngredients) => {

        let sum = Object.keys(updatedIngredients).map(igKey => (updatedIngredients[igKey]))
            .reduce((ingredientSum, ingredientCount) => {
                return ingredientSum + ingredientCount;
            }, 0);


        this.setState({ purchasable: sum > 0 });
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

    let queryParams=[];
    //let i in .. provides us with the keys of the object
    //let i for .. provides us with the values of the object coresponding to the keys
    for( let i in this.state.ingredients){
        queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i]));
            
     } console.log("queryparam");
     console.log(queryParams);
        queryParams.push("price="+this.state.burgerTotalprice);
       

    this.props.history.push(
        {pathname: '/checkout',
        search: '?'+queryParams.join('&'),
        }
    )
     }

    initilizingTheIngredients=(databaseIngredients)=>{
        this.setState({ingredients:databaseIngredients});

        Object.keys(this.state.ingredients).map(ingredient => {
            
            if (this.state.ingredients[ingredient] !== 0){
                this.setState({ burgerTotalprice: this.state.burgerTotalprice + INGREDIENT_PRICES[ingredient]
                });
                this.updatePurchasable(databaseIngredients);
            }
           
        });
   
    }

    componentDidMount() {
      console.log(  this.props);
        axiosInstance.get('/ingredients.json')
            .then(response => {
                //*Initilize the ingredients and update the price
                this.initilizingTheIngredients(response.data);

            })
            .catch(error=>{});
    }





    render() {
        const ingredients = this.state.ingredients;

        const disabledButtons = {
            ...this.state.ingredients
        }
        for (let key in disabledButtons) {
            disabledButtons[key] = disabledButtons[key] <= 0
        }

        //Show loading spinner
        let orderSummary = null;
        if (this.state.ingredients) {
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                clancelOrder={this.purshasingCancelHandler}
                continueOrder={this.purchaseContinueHandler}
                price={this.state.burgerTotalprice} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }


        let burger = <Spinner />;
        if (this.state.ingredients) {
            burger = (<>
                <Burger ingredients={ingredients} />
                <BuildControls ingredients={ingredients}
                    add={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}
                    disabledButtons={disabledButtons}
                    price={this.state.burgerTotalprice}
                    purchasable={this.state.purchasable}
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

export default withErrorHandeling(React.memo(BurgerBuilder), axiosInstance);