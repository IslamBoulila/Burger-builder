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
                        .map(ingredient => (<span className={styles.ingredients} key={ingredient[0]} >{ingredient[0]} ({ingredient[1]}) </span>));
    return (

        <div className={styles.Order} >
            <p className={styles.textInfo}>
                <span>Ingredients :</span> {ingredientOutput}
               
            </p>
            <p className={styles.textInfo}><span>Customer :</span> {props.customer.name}  </p>
            <p className={styles.textInfo}><span>Price :</span> {Number.parseFloat(props.price).toFixed(2)} </p>
        </div>

    );




}

export default Order;



