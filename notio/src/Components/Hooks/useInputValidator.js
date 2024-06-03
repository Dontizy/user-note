import {useState} from 'react'

const useInputValidator = ()=>{
const [validatorLogger, setValidatorLogger] = useState('')
let emailInput;
let passwordInput;

if(validatorLogger){
  emailInput=validatorLogger.indexOf("email") !== -1 || validatorLogger.indexOf("User does not") !== -1 || validatorLogger.indexOf("User already exists") !== -1;
    passwordInput = validatorLogger.indexOf("Unauthorized") !== -1 || validatorLogger.indexOf("password can't") !== -1;
}
return {emailInput, passwordInput, setValidatorLogger, validatorLogger}
}

export default useInputValidator;