import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.module.css';

import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Modal/Backdrop/Backdrop';



const SideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];

    }
    return (
        <>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems  isAuthentificated={props.isAuthentificated}/>
                </nav>
            </div>
        </>

    );

}

export default SideDrawer;