import { useNavigate } from "react-router-dom";
import APIClient from "../api/api";
import { useQueryClient } from "react-query";

const apiClient = new APIClient("auth/login");

const RegisterAPI = () => {
  const queryClient = useQueryClient() 
  const navigate=useNavigate();
  return {
    mutationFn: data => {
      return apiClient.post(data);
    },
    onError: (error) => {
      //handle error
      alert(error.response.data.message)
      //console.log(error.response.data.message)
    },
    onSuccess: (data) => {
      //handle success
      queryClient.setQueryData(["users",data.data.data.User], data)
      localStorage.setItem('token',data.data.data.token)
      queryClient.invalidateQueries(["users"], { exact: true })
      navigate('/')
    },
  };
};

export default RegisterAPI;