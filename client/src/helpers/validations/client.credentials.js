import { validateString } from "../validations"

export const validateCredentials=(cin,first_name,last_name,email,phone)=>{
    const validateCin=validateString(cin)
    const validateFirstName=validateString(first_name)
    const validateLastName=validateString(last_name)
    const validateEmail=validateString(email)
    const validatePhone=validateString(phone)

    return [
      {
        cin:{
          error:validateCin.error,
          message:validateCin.message
        },
        first_name:{
          error:validateFirstName.error,
          message:validateFirstName.message
        },
        last_name:{
          error:validateLastName.error,
          message:validateLastName.message
        },
        email:{
          error:validateEmail.error,
          message:validateEmail.message
        },
        phone:{
          error:validatePhone.error,
          message:validatePhone.message
        },
      }
    ]
  }