
import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import styles from './Orders.module.css';
import axiosInstance from '../../axios-order';
import withErrorHandeling from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{

    state={
        loading:true,
        orders:[],
    }

    componentDidMount(){
      
        axiosInstance.get('/orders.json')
        .then(response => {
           const orders=[];
          for(let key in response.data){
            orders.push( {
                ...response.data[key],
                id:key,
            }   );
          }
            this.setState({
                loading:false,
                orders:orders,
            });

        })
        .catch(error=>{
            this.setState({loading:false});
        });
    }

    render(){

        return(
            <div className={styles.Orders}>
                {this.state.orders.map(order =>
                      <Order  ingredients={order.ingredients} price={order.price} key={order.id}/>

               )}
              
            </div>
            


        );

    }

}

export default withErrorHandeling( Orders,axiosInstance);