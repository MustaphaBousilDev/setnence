import {Card,Button,Typography,List,ListItem,} from "@material-tailwind/react";
import { Switch } from "@material-tailwind/react";
import appartementInput from "../constants/appartement";
import CustomInput from "../components/common/Input";
import { useEffect, useState } from "react";
import AppartemnetService from './appartement.service'
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import axios from 'axios';
const EditApartment = () => {
  const {submet,handleChangeEdit,handleSubmitEdit,appertementStatus} =AppartemnetService()
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
        const updatedOldData = {
          number: appertementData.data.number || '',
          rooms: appertementData.data.rooms || 0,
          bedrooms: appertementData.data.bedrooms || 0,
          address: appertementData.data.address || '',
          price: appertementData.data.price || 0,
          city:appertementData.data.city || '',
          surface: appertementData.data.surface || 0,
          parking: appertementData.data.parking || false,
          garden: appertementData.data.garden || false,
        };
        setOldData(updatedOldData);
      }
    }, [isLoading, isError, appertementData]);
    //old data 
    const [oldData,setOldData]=useState([{
      number:'',
      rooms:0,
      bedrooms:0,
      address:'',
      price:0,
      city:'',
      surface:0,
      parking:false,
      garden:false
    }])
  
    if (isLoading) {
      // Handle loading state
      return <div>Loading...</div>;
    }
  
    if (isError) {
      // Handle error state
      return <div>Error loading data</div>;
    }
  return (
    <Card color="transparent" shadow={false} className="  bg-black p-8">
      <Typography variant="h4" color="blue-gray" className=" text-white text-center">
        {"EDIT Appartement"}
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        {"Add new appartement"}
      </Typography>
      <form onSubmit={handleSubmitEdit}  className="mt-8 mb-2 flex flex-col  gap-4 w-[70%] mx-auto">
          {
            appartementInput.map((item,index)=>{
              return (
                <div className="w-full" key={index}>
                  <CustomInput
                    key={index}
                    icon={<item.icon/>} 
                    type={item.type} 
                    name={item.name}
                    id={item.id}
                    placeholder={oldData[`${item.name}`]} 
                    onChange={handleChangeEdit}
                    className={`${item.className}  bg-gray-700 placeholder:text-gray-400 `}
                    submit={submet}
                    validate={appertementStatus[item.name].error}
                    errorMessage={appertementStatus[item.name].message}
                  />
                </div>
              )
            })
          }
          <div className=" w-full mt-4">
            <div className="w-full max-w-[24rem]">
              <List className="flex-row">
                <ListItem
                  ripple="light"
                  className="flex items-center justify-around gap-2"
                >
                  <Typography color="gray">parking</Typography>
                  <Switch
                    color="blue"
                    onChange={()=>{}}
                    name="parking"
                  />
                </ListItem>

                <ListItem
                  ripple="light"
                  className="flex items-center justify-around gap-2"
                >
                  <Typography color="gray">garden</Typography>
                  <Switch color="blue" onChange={()=>{}} name="garden" />
                </ListItem>
              </List>
            </div>
          </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="mt-6"
            color="lightBlue"
            onClick={()=>{}}
          >
            save
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default EditApartment