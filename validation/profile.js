const Validator = require('validator')

module.exports = function validateProfileInput(data) {
    let errors = {}

    data.handle = !isEmpty(data.handle) ? data.handle : ""
    data.status = !isEmpty(data.status) ? data.status : ""
    data.skills = !isEmpty(data.skills) ? data.skills : ""
    
     
    if(Validator.isEmpty(data.handle)){
        errors.handle = 'Enter handle'
    }
    if(!Validator.isLength(data.handle , { min :2 , max :30})){
        errors.handle = 'Handle must be between 2 and 30 chars ';

    }
    if(Validator.isEmpty(data.skills) ) {
        errors.skills = 'Skills field is required'
    }
    if(Validator.isEmpty(data.status) ) {
        errors.status = 'Status field is required'
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