
export const updateObject = (oldObject,updatedValues)=>{
    return{
        ...oldObject,
        ...updatedValues
    };
}

export const  checkValidation= (value, rules) =>{
    let isValid = true;
    if (rules.required) {
        isValid = value.trim("") !== "" && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if(rules.isEmail){
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = regex.test(String(value).toLowerCase());
    }
    return isValid;
}
