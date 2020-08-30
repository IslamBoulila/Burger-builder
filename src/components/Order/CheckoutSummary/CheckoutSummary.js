import React from 'react';
import Button from '../../UI/Button/Button';
import Burger from '../../Burger/Burger';
import  styles from  './CheckoutSummary.module.css';


const CheckoutSummary=(props)=>{

    

    return (
        
    <div  className={styles.OrderSummary} >
        <div style={{width:'100%'}} >
            <h1>Hope it tastes good :p</h1>
        <Burger   ingredients={props.ingredients}/>
        </div>
           
            <Button  btnType="Success" clicked={props.checkoutContinue} >Continue</Button>
            <Button  btnType="Danger" clicked={props.checkoutCancelled} > Cancel</Button>

    </div>

    );


}

export default  CheckoutSummary;