import React, { Component } from 'react';
import styles from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import * as actionCreators from '../../store/actions/index';
import { connect } from 'react-redux';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: "input",
                inputConfig: {
                    placeholder: "Email Address",
                    type: "email",
                    name: "email",
                },
                value: "",
                validation: {
                    required: true,

                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: "input",
                inputConfig: {
                    placeholder: "Password",
                    type: "password",
                    name: "password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 7,
                },
                valid: false,
                touched: false,
            },
        },
        isFormValid: false,
        isSignUp:false
    }

    checkValidation(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim("") !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        return isValid;
    }

    inputChangeHandler = (event) => {
        const { name, value } = event.target;
        let isFormValid = true;

        let updatedForm = {
            ...this.state.controls,
        };
        let updatedInputElement = {
            ...updatedForm[name],
        };

        updatedInputElement.value = value;
        updatedInputElement.valid = this.checkValidation(value, updatedInputElement.validation);
        updatedInputElement.touched = true;
        //updatedInputElement.isFormValid=true;

        updatedForm[name] = updatedInputElement;

        for (let inputElement in updatedForm) {
            isFormValid = isFormValid && updatedForm[inputElement].valid;
        }

        this.setState(prevState => ({
            ...prevState,
            controls: updatedForm,
            isFormValid: isFormValid,
        })
        );

    }

    onFormSubmit(event){
            event.preventDefault();
            this.props.onAuth(this.state.controls.email.value,
                this.state.controls.password.value,
                this.state.isSignUp);
    }
    onSwitchAuthMethodHandler=()=>{
        this.setState(prevState=>({
            isSignUp:!prevState.isSignUp,
        }));
    }


    render() {

        let inputElements = [];
        for (let inputKey in this.state.controls) {
            inputElements.push(
                {
                    id: inputKey,
                    config: this.state.controls[inputKey],
                }
            );
        }
        const formInputs = inputElements.map(input => (
            <Input key={input.id} inputType={input.config.elementType}
                inputConfig={input.config.inputConfig}
                onChange={this.inputChangeHandler}
                value={input.config.value}
                invalid={!input.config.valid}
                shouldValidate={input.config.validation}
                touched={input.config.touched}
            />
        ));

        return (
            <div className={styles.AuthForm}>
                <h2>{this.state.isSignUp?'Sign In Form':'Sign Up Form'}</h2>
                <form onSubmit={this.onFormSubmit.bind(this)}>
                    {formInputs}
                    <Button btnType="Success"  >Submit</Button>
                </form>
                <Button btnType="Danger" clicked={this.onSwitchAuthMethodHandler} >Switch to {this.state.isSignUp?'Sign Up':'Sign In'}</Button>
            </div>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password,isSignUp) => dispatch(actionCreators.auth(email, password,isSignUp))
    };
};

export default connect(null, mapDispatchToProps)(Auth);