import React from 'react';
import classes from './BuildControl.module.css';



const BuildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
           <div> {props.label}</div>
            <button onClick={props.removeIngredient}  disabled={props.disabledButtons[props.label]}  >Less</button>
            <button onClick={props.addIngredient} >More</button>
        </div>

);

}

export default BuildControl;