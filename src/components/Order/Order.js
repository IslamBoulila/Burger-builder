import React from 'react';
import styles from './Order.module.css';

const Order = (props) => {
    console.log(props);
    const ingredients = [];

    
    for (let ingredientName in props.ingredients) {
        ingredients.push([ingredientName, props.ingredients[ingredientName]]);
    }
    console.log(ingredients);
    const ingredientOutput= ingredients
                        .map(ingredient => (<span className={styles.ingredients}>{ingredient[0]} ({ingredient[1]}) </span>));
    return (

        <div className={styles.Order} >
            <p>
                Ingredients : {ingredientOutput}
               
            </p>
            <p>Customer: {props.customer.name}  </p>
            <p>Price: {Number.parseFloat(props.price).toFixed(2)} </p>
        </div>

    );




}

export default Order;



