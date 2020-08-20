import React, { Component } from 'react';
import BurgerIngredients from './BurgerIngredients/BurgerIngredient';
import classes from './Burger.module.css';
import { object } from 'prop-types';

const Burger = (props) => {

    let burgerIngredients = [];
    for (let key in props.ingredients)
        for (let ingredientRep = 0; ingredientRep < props.ingredients[key]; ingredientRep++)
            burgerIngredients.push(<BurgerIngredients type={key} key={key + ingredientRep} />);

    console.log(burgerIngredients);
    if (burgerIngredients.length == 0)
        burgerIngredients = <div>Please start adding ingredients</div>



    return (

        <div className={classes.Burger}>
            <BurgerIngredients type="BreadTop" />
            {burgerIngredients}
            <BurgerIngredients type="BreadBottom" />

        </div>

    );
}
export default Burger;