const Validator = require('validator')

module.exports = function validateRInput(data) {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.email = !isEmpty(data.email) ? data.email : ""
     
    if(!Validator.isLength(data.name , { min :2 , max :30})){
        errors.name = 'Name must be between 2 and 30 chars ';

    }

    if(!Validator.isEmail(data.email)){
        errors.email = 'Enter a correct email'
    }
    if(Validator.isEmpty(data.name) ) {
        errors.name = 'Name field is required'
    }

    if(Validator.isEmpty(data.email) ) {
        errors.email = 'Email field is required'
    }

    if(Validator.isEmpty(data.password) ) {
        errors.password = 'Password field is required'
    }

    if(!Validator.isLength(data.password, {min : 6 , max : 30})){
        errors.password = 'Must be between 6 and 30'
    }

    if(!Validator.equals(data.password,data.password2)){
        errors.password2 = 'Password must be same'
    }

    return {
        errors, isValid : isEmpty(errors)
    }
} 

function isEmpty(value){
    return( value === undefined 
        || value === null 
        || (typeof value === 'object' && Object.keys(value).length === 0) 
        || (typeof value === 'string' && value.trim().length === 0)
    );
}