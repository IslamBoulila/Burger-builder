import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import styles from '../ContactData/ContactData.module.css';
import axiosInstance from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderForm:{
                name:{
                    elementType:"input",
                    inputConfig:{
                        placeHolder:"Name",
                        type:"text",
                        name:"name",
                    },
                    value:"",
                },
                email:{
                    elementType:"input",
                    inputConfig:{
                        placeHolder:"Email",
                        type:"email",
                        name:"email",
                    },
                    value:"",
                },
                street:{
                    elementType:"input",
                    inputConfig:{
                        placeHolder:"Street",
                        type:"text",
                        name:"street"
                    },
                    value:"",
                },

                homeNumber:{
                    elementType:"input",
                    inputConfig:{
                        placeHolder:"Home Number",
                        type:"number",
                        name:"homeNumber",
                    },
                    value:"",
                },
                deliveryMode:{
                    elementType:"select",
                    inputConfig:{
                        options:[ {value:'fastest', displayValue:'Fastest'}, {value:'normal', displayValue:'Normal'}],
                        name:'deliveryMode'
                    },
                    value:"",
                },

                
            },
            
            loading: false,
        }
    }

    inputChangeHandler = (event) => {
        const field = event.target.name;
        let inputValue=event.target.value;
        this.setState(prevState=>({
            orderForm:{
                         ...prevState.orderForm,
                         [field]:{
                             ...prevState.orderForm[field],
                             value:inputValue,
                         },
                     }
             })
        ); 
        
    }

    onSubmitContactFormHandler = (event) => {
        event.preventDefault();
        console.log(this.state.name);
        console.log(this.props.ingredients);

        this.setState({ loading: true });
        const contactFormData={};
       for(let data in this.state.orderForm){
        contactFormData[data]=this.state.orderForm[data].value;
       }
        const orderData = {
            ingredients: this.props.ingredients,

            customer: {
                name: contactFormData.name,
                email: contactFormData.email,
                address: {
                    street:contactFormData.street,
                    homeNumber:contactFormData.homeNumber,
                },  
            },
            price: this.props.price,
            deliveryMode: contactFormData.deliveryMode,
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
        let inputElements=[];
        for(let inputKey in this.state.orderForm){
            inputElements.push(
                {id:inputKey,
                config:this.state.orderForm[inputKey],
                }
            );
        }
        let form = (
            <form onSubmit={this.onSubmitContactFormHandler}>
               {inputElements.map(input=>(
                    <Input key={input.id}  inputType={input.config.elementType}   
                            inputConfig={input.config.inputConfig} 
                           onChange={this.inputChangeHandler}
                           value={input.config.value} />
               ))}
               
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