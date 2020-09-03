import React, { Component } from 'react';
import classes from './layout.module.css';
import ToolBar from '../Navigation/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import {connect}  from 'react-redux';



class Layout extends Component {

state={
    showSideDrawer:false
}

sideDrawerClosedHandler=()=>{
this.setState({showSideDrawer:false});
}

sideDrawerToggleHandler=()=>{
    this.setState(prevState => ({showSideDrawer:!prevState.showSideDrawer}));
    }
    render() {
        return (
            <>
                <ToolBar  SideDrawerToggle={this.sideDrawerToggleHandler} 
                isAuthentificated={this.props.isAuthentificated}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}
                    isAuthentificated={this.props.isAuthentificated}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </>
        );
    }
}

const mapStateToProps=( state)=>{
    return{
        isAuthentificated:state.authReducer.idToken!=null,
    };
}
export default  connect(mapStateToProps) (Layout);