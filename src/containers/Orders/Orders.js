
import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import styles from './Orders.module.css';
import axiosInstance from '../../axios-order';
import withErrorHandeling from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
class Orders extends Component {

   
    componentDidMount() {

        this.props.onFetchOrders(this.props.authToken,this.props.userId);
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading)
            orders = (this.props.orders.map(order =>
                <Order ingredients={order.ingredients} price={order.price}
                    key={order.id}
                    customer={order.customer} />
            )

            );
        return (
            <div className={styles.Orders}>
                    {orders}
            </div>

        );

    }
}
const mapStateToProps = (state) => {
    return {
        orders: state.orderReducer.orders,
        loading:state.orderReducer.loading,
        authToken:state.authReducer.idToken,
        userId:state.authReducer.userId,
    };
};
const  mapDispatchToProps=(dispatch)=>{
    return{
        onFetchOrders: (authToken,userId) => dispatch(actionCreators.fetchOrders(authToken,userId)),
    };
};


export default withErrorHandeling(
    connect(mapStateToProps, mapDispatchToProps)(Orders), axiosInstance);