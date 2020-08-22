import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from '../ContactData/ContactData.module.css';
import axiosInstance from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';



class ContactData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            address: {
                homeNumber: '',
                street: '',
            },
            loading: false,
        }
    }

    inputChangeHandler = (event) => {
        const field = event.target.name;
        console.log(event.target.value);
        if (field !== "street" && field !== "homeNumber") {
            this.setState({
                [field]: event.target.value
            });
        }
        else {
            this.setState(prevState => (
                {
                    address: {
                        ...prevState.address,
                        [field]: event.target.value,
                    }
                })
            );
        }
    }

    onSubmitContactFormHandler = (event) => {
        event.preventDefault();
        console.log(this.state.name);
        console.log(this.props.ingredients);

        this.setState({ loading: true });

        const orderData = {
            ingredients: this.props.ingredients,

            customer: {
                name: this.state.name,
                address: this.state.address,
                email: this.state.email,

            },
            price: this.props.price,
            deliveryMethod: 'fastest'
        }
        axiosInstance.post('/orders.json', orderData)
            .then(response => {

                this.setState({ loading: false });

            })
            .catch(error => {
                this.setState({ loading: false });
            });

        this.props.history.push('/');

    }

    render() {
        let form = (
            <form onSubmit={this.onSubmitContactFormHandler}>
                <input className={styles.Input} name="name" placeholder="Name " onChange={this.inputChangeHandler} value={this.state.name} />
                <input className={styles.Input} name="email" placeholder="Email" onChange={this.inputChangeHandler} value={this.state.email} />
                <input className={styles.Input} name="street" placeholder="Street" onChange={this.inputChangeHandler} value={this.state.address.street} />
                <input className={styles.Input} name="homeNumber" placeholder="Home number" onChange={this.inputChangeHandler} value={this.state.address.homeNumber} />
                <Button btnType="Success" >Order</Button>

            </form>);

        if(this.state.loading)
            form=<Spinner/>;
        return (
            <div className={styles.ContactData}>
                <h4>Enter your data</h4>
                {form}
            </div>

        );
    }

}

export default ContactData;