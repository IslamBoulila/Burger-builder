import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


const BuildControls = (props) => {

    const labels = Object.keys(props.ingredients);
    return (
        <div className={classes.BuildControls}>
            <p><strong>Current price: </strong>{props.price.toFixed(2)}</p>
            {labels.map(label => <BuildControl
                label={label} key={label}

                addIngredient={()=>props.add(label)} 
                removeIngredient={()=>props.remove(label)}
                disabledButtons={props.disabledButtons}
                />)
            }
        <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.orderButtonHandler}> {props.isAuthentificated? 'Order now' : 'SIGN IN TO ORDER' }</button>
            
        </div>
    )


}

export default BuildControls;