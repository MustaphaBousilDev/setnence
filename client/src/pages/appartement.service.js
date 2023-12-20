import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import {validateCredentials} from '../helpers/validations/appartement.credentials'
import { useNavigate, useParams } from 'react-router-dom';
const AppartemnetService=()=>{
  const { id } = useParams();
    // Define a query key, which includes the 'id'
    const queryKey = ['apartment', id];

    // Fetch data using React Query
    const { data: appertementData, isLoading, isError } = useQuery(queryKey, async () => {
      // Make the API call to fetch apartment data based on the 'id'
      const response = await axios.get(`http://localhost:4000/api/v1/appartement/${localStorage.getItem('token')}/${id}`); // Replace with your actual API endpoint
      return response.data; // Assuming the data is in the 'data' property of the response
    });
    useEffect(() => {
      if (!isLoading && !isError && appertementData) {
        // Map specific properties from appertementData.data to oldData
        let updatedOldData = {
          number: appertementData.data.number || '',
          rooms: appertementData.data.rooms || 0,
          bedrooms: appertementData.data.bedrooms || 0,
          address: appertementData.data.address || '',
          price: appertementData.data.price || 0,
          city:appertementData.data.city || '',
          surface: appertementData.data.surface || 0,
          parking: appertementData.data.parking || false,
          garden: appertementData.data.garden || false,
          _id:id
        };
  
        setAppertmentEdit(updatedOldData)
      }
    }, [isLoading, isError,id]);
  const navigate=useNavigate()
  const [submet,setSubmet]=useState(false) 
  const [appertement,setAppertment]=useState({
    number:'',
    rooms:0,
    bedrooms:0,
    address:'',
    city:'',
    price:0,
    surface:0,
    parking:false,
    garden:false
  })
  const [appertementEdit,setAppertmentEdit]=useState({
    _id:id,
    number:'',
    rooms:0,
    bedrooms:0,
    address:'',
    city:'',
    price:0,
    surface:0,
    parking:false,
    garden:false
  })
  const [appertementStatus, setAppertementStatus] = useState({
    number:{error:false,message:''},
    rooms:{error:false,message:''},
    bedrooms:{error:false,message:''},
    address:{error:false,message:''},
    city:{error:false,message:''},
    price:{error:false,message:''},
    surface:{error:false,message:''},

  });
  const mutation = useMutation((data) => {
    return axios
       .post(`http://localhost:4000/api/v1/appartement/${localStorage.getItem('token')}`, data); // Replace '/api/your-endpoint' with your actual API endpoint
  });
  const mutationEdit = useMutation((data) => {
    return axios
       .patch(`http://localhost:4000/api/v1/appartement/${localStorage.getItem('token')}`, data); // Replace '/api/your-endpoint' with your actual API endpoint
  });
  const handleSubmit =async  (e) => {
    console.log('submit')
    e.preventDefault()
    setSubmet(true)
    const isValid =validateCredentials(
      appertement.number,
      appertement.rooms,
      appertement.bedrooms,
      appertement.address,
      appertement.city,
      appertement.price,
      appertement.surface
    );
    setAppertementStatus({
      ...appertementStatus,
      number: {error: isValid[0].number.error,message:isValid[0].number.message},
      rooms: {error: isValid[0].rooms.error,message:isValid[0].rooms.message},
      bedrooms: {error: isValid[0].bedrooms.error,message:isValid[0].bedrooms.message},
      address: {error: isValid[0].address.error,message:isValid[0].address.message},
      city: {error: isValid[0].city.error,message:isValid[0].city.message},
      price: {error: isValid[0].price.error,message:isValid[0].price.message},
      surface: {error: isValid[0].surface.error,message:isValid[0].surface.message},
    })
    if(isValid){
      //send data to store in database using mutate reactQuery
      try {
        // Call the mutation function with the data you want to send
        await mutation.mutateAsync(appertement);
        // Optionally, you can handle success or navigate to a different page
        navigate('/dashboard/appartement')
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
        await mutationEdit.mutateAsync(appertementEdit);
        // Optionally, you can handle success or navigate to a different page
        navigate('/dashboard/appartement')
      } catch (error) {
        console.error('Error sending data:', error);
        // Handle error as needed
      }
    
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppertment({ ...appertement, [name]: value });

    const isValid =validateCredentials(appertement.number,
      appertement.rooms,
      appertement.bedrooms,
      appertement.address,
      appertement.city,
      appertement.price,
      appertement.surface);
    setAppertementStatus({
      ...appertementStatus,
      number: {error: isValid[0].number.error,message:isValid[0].number.message},
      rooms: {error: isValid[0].rooms.error,message:isValid[0].rooms.message},
      bedrooms: {error: isValid[0].bedrooms.error,message:isValid[0].bedrooms.message},
      address: {error: isValid[0].address.error,message:isValid[0].address.message},
      city: {error: isValid[0].city.error,message:isValid[0].city.message},
      price: {error: isValid[0].price.error,message:isValid[0].price.message},
      surface: {error: isValid[0].surface.error,message:isValid[0].surface.message},
    })
  };
  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    console.log(value)
    setAppertmentEdit({ ...appertementEdit, [name]: value });
    console.log('fucking change')
    console.log(appertementEdit) 
  };

  return {
    submet,
    appertement,
    appertementEdit,
    handleChange,
    handleSubmit,
    handleChangeEdit,
    handleSubmitEdit,
    appertementStatus

  }
}





export default AppartemnetService