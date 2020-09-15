import React, { Component,useState } from 'react';
import classes from './layout.module.css';
import ToolBar from '../Navigation/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import {connect}  from 'react-redux';



const Layout=( props) => {

const [showSideDrawer, setShowSideDrawer] = useState(false);

const sideDrawerClosedHandler=()=>{
    setShowSideDrawer(false);
}

const sideDrawerToggleHandler=()=>{
    setShowSideDrawer(prevState => ({showSideDrawer:!prevState.showSideDrawer}));
    }
   
        return (
            <>
                <ToolBar  SideDrawerToggle={sideDrawerToggleHandler} 
                isAuthentificated={props.isAuthentificated}/>
                <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler}
                    isAuthentificated={props.isAuthentificated}
                />
                <main className={classes.Content}>{props.children}</main>
            </>
        );
    }


const mapStateToProps=( state)=>{
    return{
        isAuthentificated:state.authReducer.idToken!=null,
    };
}
export default  connect(mapStateToProps) (Layout);