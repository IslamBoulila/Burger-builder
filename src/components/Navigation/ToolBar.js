import React from 'react';
import classes from './ToolBar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from './NavigationItems/NavigationItems';
import SideDrawerToggle   from '../Navigation/SideDrawer/SideDrawerToggle';


const ToolBar = (props) => {

    return (
        <header className={classes.ToolBar}>
            <SideDrawerToggle sideMenuToggleHandler={props.SideDrawerToggle} />
            <div   className={classes.Logo}>
            <Logo />
            </div>
            
            <nav  className={classes.DesktopOnly}>
                <NavigationItems/>
                
            </nav>
        </header>
        
    );

}

export default ToolBar;