import React from 'react';
import classes from './NavigationItems.module.css';
import  NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = ( props) => {
    return (
        <ul  className={classes.NavigationItems}>
            <NavigationItem  link="/"  >Burger builder</NavigationItem>
            <NavigationItem link='/orders'>Orders</NavigationItem>
            {props.isAuthentificated? 
                 <NavigationItem link='/logout'>Logout</NavigationItem> :
                 <NavigationItem link='/auth'>Authentication</NavigationItem>
    
        }
            
        </ul>)


}
export default NavigationItems;