import React from 'react';
import styles from './Input.module.css';

const Input = (props) => {

    let inputElement ;
    switch (props.inputType){
        case "input":
            inputElement=<input className={styles.inputElement} {...props.inputConfig} value={props.value} onChange={props.onChange}/>
            break;
        case "textarea":
            inputElement=<textarea className={styles.inputElement} {...props.inputConfig} onChange={props.onChange} value={props.value} onChange={props.onChange} />
            break;
        case "select":
             inputElement=<select className={styles.inputElement} name={props.inputConfig.name} value={props.value} onChange={props.onChange} >
                                {props.inputConfig.options.map(option=>
                                    (<option key={option.value} value={option.value} >{option.displayValue}</option>)) }
                        </select>
                         
             break;
        default :
        inputElement=<input className={styles.inputElement} {...props.inputConfig} value={props.value} value={props.value} onChange={props.onChange}/>
        break;
    }

    return (
        <div className={styles.Input} >
            <label>{props.label}</label>
            {inputElement}
        </div>

    );


}
export default Input;
