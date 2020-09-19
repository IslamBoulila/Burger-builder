import React, { Component } from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/OrderSummary/OrderSummary';
import axiosInstance from '../axios-order';

import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandling from '../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import Title from '../components/UI/Title/Title';

import * as actionCreators from '../store/actions/index';


export class BurgerBuilder extends Component {

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

        return sum > 0;
    }

    purshasingHandler = () => {
        if (!this.props.isAuthenticated) {
            this.props.onSetAuthRedirect('/checkout');
            this.props.history.push('/auth');
        }

        else {
            this.setState({
                purchasing: true
            });
        }
    }

    purshasingCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {

        this.props.history.push('/checkout')
    }




    componentDidMount() {
        this.props.purshaseBurgerInit();
        this.props.onInitilizeIngredients();

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



        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if (this.props.ingredients) {
            burger = (<>
                <Title type="h1">  Wash your hands first  &#128527; and start making your own <br />
                    <strong>healthy burger  &#128523; !</strong></Title>

                <Burger ingredients={ingredients} />
                <BuildControls ingredients={ingredients}
                    add={this.props.onAddIngredient}
                    remove={this.props.onRemoveIngredient}
                    disabledButtons={disabledButtons}
                    price={this.props.burgerTotalprice}
                    purchasable={this.updatePurchasable(this.props.ingredients)}
                    orderButtonHandler={this.purshasingHandler}
                    isAuthenticated={this.props.isAuthenticated}
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


const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredientsRed.ingredients,
        burgerTotalprice: state.ingredientsRed.burgerTotalprice,
        error: state.ingredientsRed.error,
        isAuthenticated: state.authReducer.idToken != null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (ingredient) => dispatch(actionCreators.addIngredient(ingredient)),
        onRemoveIngredient: (ingredient) => dispatch(actionCreators.removeIngredient(ingredient)),
        onInitilizeIngredients: () => dispatch(actionCreators.initializeIngredients()),
        purshaseBurgerInit: () => dispatch(actionCreators.purshaseBurgerInit()),

        onSetAuthRedirect: (path) => dispatch(actionCreators.setAuthRedirect(path))

    };
};


export default withErrorHandling(React.memo(

    connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)

), axiosInstance);