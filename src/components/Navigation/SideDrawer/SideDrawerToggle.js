import React from 'react';

import classes from './DrawerToggle.module.css';


const sideDrawerToggle = (props) => {

    return (
        <div className={classes.DrawerToggle}  onClick={props.sideMenuToggleHandler}  >

            <div></div>
            <div></div>
            <div></div>
        </div>

    );

}

export default sideDrawerToggle;
