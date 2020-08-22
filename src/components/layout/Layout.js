import React, { Component } from 'react';
import classes from './layout.module.css';
import ToolBar from '../Navigation/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';



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
                <ToolBar  SideDrawerToggle={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>{this.props.children}</main>
            </>
        );
    }
}


export default Layout;