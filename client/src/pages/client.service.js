import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import {validateCredentials} from '../helpers/validations/client.credentials'
import { useNavigate, useParams } from 'react-router-dom';
const ClientService=()=>{
  const { id } = useParams();
    // Define a query key, which includes the 'id'
    const queryKey = ['client', id];

    // Fetch data using React Query
    const { data: clientData, isLoading, isError } = useQuery(queryKey, async () => {
      // Make the API call to fetch apartment data based on the 'id'
      const response = await axios.get(`http://localhost:4000/api/v1/client/${localStorage.getItem('token')}/${id}`); // Replace with your actual API endpoint
      return response.data; // Assuming the data is in the 'data' property of the response
    });
    useEffect(() => {
      if (!isLoading && !isError && clientData) {
        // Map specific properties from appertementData.data to oldData
        let updatedOldData = {
          cin: clientData.data.number || '',
          first_name: clientData.data.first_name || '',
          last_name: clientData.data.last_name || '',
          email : clientData.data.email || '',
          phone : clientData.data.phone || '',
          _id:id
        };
  
        setClientEdit(updatedOldData)
      }
    }, [isLoading, isError,id]);
  const navigate=useNavigate()
  const [submet,setSubmet]=useState(false) 
  const [client,setClient]=useState({
    cin:'',
    first_name:'',
    last_name:'',
    email:'',
    phone:''
  })
  const [clientEdit,setClientEdit]=useState({
    _id:id,
    cin:'',
    first_name:'',
    last_name:'',
    email:'',
    phone:''
  })
  const [clientStatus, setClientStatus] = useState({
    cin:{error:false,message:''},
    first_name:{error:false,message:''},
    last_name:{error:false,message:''},
    email:{error:false,message:''},
    phone:{error:false,message:''},

  });
  const mutation = useMutation((data) => {
    return axios
       .post(`http://localhost:4000/api/v1/client/${localStorage.getItem('token')}`, data); // Replace '/api/your-endpoint' with your actual API endpoint
  });
  const mutationEdit = useMutation((data) => {
    return axios
       .patch(`http://localhost:4000/api/v1/client/${localStorage.getItem('token')}`, data); // Replace '/api/your-endpoint' with your actual API endpoint
  });
  const handleSubmit =async  (e) => {
    console.log('submit')
    e.preventDefault()
    setSubmet(true)
    const isValid =validateCredentials(
      client.cin,
      client.first_name,
      client.last_name,
      client.email,
      client.phone,
    );
    setClientStatus({
      ...clientStatus,
      cin: {error: isValid[0].cin.error,message:isValid[0].cin.message},
      first_name: {error: isValid[0].first_name.error,message:isValid[0].first_name.message},
      last_name: {error: isValid[0].last_name.error,message:isValid[0].last_name.message},
      email: {error: isValid[0].email.error,message:isValid[0].email.message},
      phone: {error: isValid[0].phone.error,message:isValid[0].phone.message},
    })
    if(isValid){
      //send data to store in database using mutate reactQuery
      try {
        // Call the mutation function with the data you want to send
        await mutation.mutateAsync(client);
        // Optionally, you can handle success or navigate to a different page
        navigate('/dashboard/client')
      } catch (error) {
        console.error('Error sending data:', error);
        // Handle error as needed
      }
    }
  }
  const handleSubmitEdit =async  (e) => {
    e.preventDefault()
    setSubmet(true)
      //send data to store in database using mutate reactQuery
      try {
        // Call the mutation function with the data you want to send
        await mutationEdit.mutateAsync(clientEdit);
        // Optionally, you can handle success or navigate to a different page
        navigate('/dashboard/client')
      } catch (error) {
        console.error('Error sending data:', error);
        // Handle error as needed
      }
    
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });

    const isValid =validateCredentials(client.cin,
      client.first_name,
      client.last_name,
      client.email,
      client.phone);
    setClientStatus({
      ...clientStatus,
      cin: {error: isValid[0].cin.error,message:isValid[0].cin.message},
      first_name: {error: isValid[0].first_name.error,message:isValid[0].first_name.message},
      last_name: {error: isValid[0].last_name.error,message:isValid[0].last_name.message},
      email: {error: isValid[0].email.error,message:isValid[0].email.message},
      phone: {error: isValid[0].phone.error,message:isValid[0].phone.message},
    })
  };
  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    console.log(value)
    setClientEdit({ ...clientEdit, [name]: value });
    console.log('fucking change')
    console.log(clientEdit) 
  };

  return {
    submet,
    client,
    clientEdit,
    handleChange,
    handleSubmit,
    handleChangeEdit,
    handleSubmitEdit,
    clientStatus

  }
}





export default ClientService