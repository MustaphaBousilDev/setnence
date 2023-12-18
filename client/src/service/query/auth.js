import { useNavigate } from "react-router-dom";
import APIClient from "../api/api";
import { useQueryClient } from "react-query";

const apiClient = new APIClient("/login");

const RegisterAPI = () => {
  const queryClient = useQueryClient() 
  const navigate=useNavigate();
  return {
    mutationFn: data => {
      return apiClient.post(data);
    },
    onError: (error) => {
      //handle error
      console.log(error)
    },
    onSuccess: (data) => {
      //handle success
      console.log('this is fucking me')
      console.log(data.data.data)
      queryClient.setQueryData(["users",data.data.data.User], data)
      localStorage.setItem('token',data.data.data.token)
      queryClient.invalidateQueries(["users"], { exact: true })
      navigate('/')
    },
  };
};

export default RegisterAPI;