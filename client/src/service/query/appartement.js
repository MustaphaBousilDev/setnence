import { useNavigate } from "react-router-dom";
import APIClient from "../api/api";
import { useQueryClient } from "react-query";

const apiClient = new APIClient(`appartement/${localStorage.getItem('token')}`);

const AppartementAPI_All = () => {
  const queryClient = useQueryClient() 
  return {
    queryFn: data => {
      return apiClient.getAll();
    },
    onError: (error) => {
      //handle error
      console.log(error)
    },
    onSuccess: (data) => {
      //handle success
      // console.log('this is fucking me')
      // console.log(data.data)
      queryClient.setQueryData(["appartement",data], data)
      // localStorage.setItem('token',data.data.data.token)
      queryClient.invalidateQueries(["appartement"], { exact: true })
      // navigate('/')
      return data 
    },
  };
};

export default AppartementAPI_All;