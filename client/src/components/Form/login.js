
import { useState } from 'react'
import { validateCredentials } from '../../helpers/validations/login.credentials'
import useMutateHook from '../../hooks/useQuery'
import RegisterAPI from '../../service/query/auth'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
export const LoginService = () => { 
  const [submet,setSubmet]=useState(false) 
  const [login,setLogin]=useState({
    email:'',
    password:'',
  })
  const [loginStatus, setLoginStatus] = useState({
    email: {error: false,message: ''},
    password: {error: false,message: ''},
  });
  const navigate=useNavigate()
  const handleSubmit = (e) => {
    console.log('submit')
    e.preventDefault()
    setSubmet(true)
    const isValid =validateCredentials(login.email,login.password);
    setLoginStatus({
      ...loginStatus,
      email: {error: isValid[0].email.error,message:isValid[0].email.message},
      password: {error: isValid[0].password.error, message:isValid[0].password.message}
    })
    if(isValid){
      loginUserMutation.mutate(login);
    }
  }
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    console.log(login.password)
    const isValid =validateCredentials(login.email,login.password);
    setLoginStatus({
      ...loginStatus,
      email: {error: isValid[0].email.error,message:isValid[0].email.message},
      password: {error: isValid[0].password.error, message:isValid[0].password.message}
    })
  };

  //react query 
  // const queryClient = useQueryClient()
  // const loginUserMutation = useMutation({
  //   mutationFn: loginUser,
  //   onSuccess: data => {
  //     queryClient.setQueryData(["users", data], data)
  //     queryClient.invalidateQueries(["users"], { exact: true })
  //     localStorage.setItem('token',data.data.token)
  //     Cookies.set('token', data.data.token, { httpOnly: true });
  //     navigate('/')
  //   },
  //   onError: (error)=>{
  //     toast.error(error.response.data.message);
  //   }
  // })

  const loginUserMutation=useMutateHook(RegisterAPI())

  //validate credentials
  return {
    loginUserMutation,
    submet,
    login,
    loginStatus,
    handleSubmit,
    handleLoginChange,
  }
}


