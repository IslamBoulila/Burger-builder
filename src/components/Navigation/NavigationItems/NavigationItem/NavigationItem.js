import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItem.module.css'

const NavigationItem =(props)=>{
    return (
    <li  className={classes.NavigationItem}>
         <NavLink to={props.link} >{props.children}</NavLink>
         
     </li>);

     {/*  <li  className={classes.NavigationItem}>
      <NavLink href={props.link} />
      <a href={props.link}  className={props.active? classes.active : null}>{props.children}</a>
  </li>*/}
     
    
}

export default NavigationItem ;