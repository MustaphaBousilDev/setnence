import './login.css'
import CustomInput from '../common/Input'
import { Link } from 'react-router-dom';
import { FormButton} from '../common/Buttons'
import { LoginService } from './login';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { loginUser } from '../../service/api/auth/auth';
import {AiOutlineMail,AiFillLock} from 'react-icons/ai'
import { validateCredentials } from '../../helpers/validations/login.credentials'
import loginInputs from '../../constants/login';
export const Login = () => {
  const loginService=LoginService()
  const {submet,loginStatus,handleSubmit,handleLoginChange} = loginService

  return (
    <form
      onSubmit={handleSubmit}
      className=' my-4 flex flex-col gap-4' >
      
        <Toaster position="top-right" reverseOrder={false}>
          {/* Add any toasts you want to display when an error occurs */}
        </Toaster>
      
      {
        loginInputs.map((item,index)=>{
          return (
            <CustomInput 
              key={index}
              icon={<item.icon/>} 
              type={item.type} 
              name={item.name}
              id={item.id}
              placeholder={item.placeholder} 
              onChange={handleLoginChange}
              className={`${item.className}`}
              submit={submet}
              validate={loginStatus[item.name].error}
              errorMessage={loginStatus[item.name].message}
            />
          )
        })
      }

      <FormButton
        disabled={loginService.loginUserMutation.isLoading}
        >
        {
          loginService.loginUserMutation.isLoading ? 'Login...' : 'Login'
        }
      </FormButton>

      <div className=' text-white w-[80%] mx-auto hover:underline transition text-sm'>
        <Link to='/forgotPassword'>
          Forgot password
        </Link>
      </div>

      <div className=' flex items-center gap-2 w-[80%] mx-auto my-6'>
        <span className=' h-[1px] w-[49%] bg-white mt-1'></span>
        <span className=' text-white'>or</span>
        <span className=' h-[1px] w-[49%] bg-white mt-1'></span>
      </div>
    </form>
  )
}