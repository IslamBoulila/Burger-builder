import React, { Component, isValidElement } from 'react';
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
                        placeholder:"Name",
                        type:"text",
                        name:"name",
                    },
                    value:"",
                    validation:{
                        required:true,
                        minLength:'3',
                    },
                    valid:false,
                    touched:false,
                },
                email:{
                    elementType:"input",
                    inputConfig:{
                        placeholder:"Email",
                        type:"email",
                        name:"email",
                    },
                    value:"",
                    validation:{
                        required:true,
                        
                    },
                    valid:false,
                    touched:false,
                },
                street:{
                    elementType:"input",
                    inputConfig:{
                        placeholder:"Street",
                        type:"text",
                        name:"street"
                    },
                    value:"",
                    validation:{
                        required:true,
                        minLength:'4',
                    },
                    valid:false,
                    touched:false,
                },

                homeNumber:{
                    elementType:"input",
                    inputConfig:{
                        placeholder:"Home Number",
                        type:"number",
                        name:"homeNumber",
                    },
                    value:"",
                    validation:{
                        required:true,
                    },
                    valid:false,
                    touched:false,
                },
                deliveryMode:{
                    elementType:"select",
                    inputConfig:{
                        options:[ {value:'fastest', displayValue:'Fastest'}, {value:'normal', displayValue:'Normal'}],
                        name:'deliveryMode'
                    },
                    value:"",
                    validation:{ },
                    valid:true,
                },
            },
            isFormValid:false,
            loading: false,
        }
    }
    checkValidation(value,rules){
        let isValid=true;
        if(rules.required){
            isValid=value.trim("")!=="" && isValid;
        }
        if(rules.minLength){
            isValid=value.length>=rules.minLength && isValid;
        }
        return isValid;
    }

    inputChangeHandler = (event) => {
        const {name,value} = event.target;
        let isFormValid=true;
       
        let updatedForm={
            ...this.state.orderForm,
        };
        let updatedInputElement={
            ...updatedForm[name],
        };

        updatedInputElement.value=value;
        updatedInputElement.valid=this.checkValidation(value,updatedInputElement.validation);
        updatedInputElement.touched=true;
        updatedInputElement.isFormValid=true;

        updatedForm[name]=updatedInputElement;
        
        for(let inputElement in updatedForm ){
            isFormValid= isFormValid && updatedForm[inputElement].valid;
        }

        this.setState(prevState =>({
            ...prevState,
            orderForm:updatedForm,
            isFormValid: isFormValid,
             } )
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
                           value={input.config.value} 
                           invalid={!input.config.valid}
                           shouldValidate={input.config.validation}
                           touched={input.config.touched}
                           />
               ))}
               
                <Button btnType="Success" disabled={!this.state.isFormValid} >Order</Button>

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