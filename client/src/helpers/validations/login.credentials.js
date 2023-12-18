import { validateEmail, validatePassword} from "../validations"

export const validateCredentials=(email,password)=>{
    const emailValidate=validateEmail(email)
    const passwordValidate=validatePassword(password)

    return [
      {
        email: {
          error:emailValidate.error,
          message:emailValidate.message
        },
        password: {
          error:passwordValidate.error,
          message:passwordValidate.message
        },
      }
    ]
  }