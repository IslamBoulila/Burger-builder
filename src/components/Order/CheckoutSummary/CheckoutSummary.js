import React from 'react';
import Button from '../../UI/Button/Button';
import Burger from '../../Burger/Burger';
import  styles from  './CheckoutSummary.module.css';
import Title from '../../UI/Title/Title';


const CheckoutSummary=(props)=>{

    

    return (
        
    <div  className={styles.OrderSummary} >
        <div style={{width:'100%'}} >
           <Title type="h2" >Hope it tastes good &#128523;</Title>
        <Burger   ingredients={props.ingredients}/>
        </div>
           
            <Button  btnType="Success" clicked={props.checkoutContinue} >Continue</Button>
            <Button  btnType="Danger" clicked={props.checkoutCancelled} > Cancel</Button>

    </div>

    );


}

export default  CheckoutSummary;