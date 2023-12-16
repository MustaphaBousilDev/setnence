import { Login } from "../components/Form/Login.jsx"
import { Shadow } from "../components/shadow"
import {Backgrounds} from '../components/Backgrounds.jsx'
// import { useNavigate } from "react-router-dom"

const Inscreption = () => {
  //const navigate=useNavigate()
    // const getUserAuth = () => {
    //   if(localStorage.getItem('token').length>0){
    //     navigate('/')
    //   }
    // }
  return (
    <>
    <Backgrounds />
    <div className="modal-inscreption">
        <h3 className=" w-full text-white text-center inline-block text-5xl">
          Mugiwara Login
        </h3>
        <Login />
    </div>
    <Shadow className={`opacity-80`}/>
    </>
  )
}

export default Inscreption