import React from 'react';

import Button from '../UI/Button/Button';

const OrderSummary =  ({ ingredients,price,clancelOrder ,continueOrder}) => {


    const ingredientList = Object.keys(ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: "capitalize" }}>{igKey}</span> : {ingredients[igKey]}
            </li>
        });

    return (
        <>
            <h3>Your order</h3>
            <p>A Healthy yummy burger with the following ingredients:</p>
            <ul>
                {ingredientList}
            </ul>
            <p><strong>Total price: {price.toFixed(2)} </strong></p>
            <p>Continue to checkout ?</p>
            <Button   btnType="Success"  clicked={continueOrder} >YES</Button>
            <Button btnType="Danger"  clicked={clancelOrder} >CANCEL</Button>
            
        </>
    );

};

export default React.memo(OrderSummary);