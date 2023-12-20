import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Spinner,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";
import axios from "axios";
const TABLE_HEAD = [
  "Image",
  "N°",
  "Price",
  "Rooms",
  "Status",
  "Surface",
  "City",
  "Address",
  "Actions",
];

const TABLE_ROWS = [];


const Appartment = () => {

  const fetchAppartments = async () => {
    const response = await axios.get(`http://localhost:4000/api/v1/appartement/${localStorage.getItem('token')}`); // Replace with your actual API endpoint
    return response.data;
  };

  

  const { data: appartments, isLoading, refetch } = useQuery("appartment", fetchAppartments);
  const handleDelete=async (id)=>{
    //console.log('rrrrr')
    //console.log('ototot ',id);
    const response = await axios
    .delete(`http://localhost:4000/api/v1/appartement/${localStorage.getItem('token')}`,{
      data:{
        id:id
      }
    }); // Replace with your actual API endpoint
    refetch()
  }
  if (isLoading) {
    return <Spinner color="blue" size="large" />;
  }

  //console.log(appartments.data)


  
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Appartement
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              List of all appartement
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72 flex justify-end ">
              <div className="flex justify-between">
                <Link to={"/dashboard/appartement/add"}>
                  <Button className="flex items-center gap-3" size="sm">
                    Add Appartement
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70 text-center"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={9}>
                  <div className="flex justify-center items-center gap-2 mt-2">
                    <Spinner color="blue" />
                    <Typography color="gray">Loading...</Typography>
                  </div>
                </td>
              </tr>
            )}
            {appartments.data.length === 0 && (
              <tr>
                <td colSpan={9}>
                  <div className="flex justify-center items-center gap-2 mt-2">
                    <Typography color="gray">No data found</Typography>
                  </div>
                </td>
              </tr>
            )}
            {appartments.data.map(
              (
                {
                  _id,
                  image,
                  price,
                  number,
                  surface,
                  rooms,
                  city,
                  address,
                  status,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50 text-center";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={image}
                          alt={number}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                      </div>
                    </td>
                    <td>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        {number}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {price}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {rooms}
                      </Typography>
                    </td>
                    <td className={classes} style={{textAlign:"-webkit-center"}}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={status === true ? "paid" : "pending"}
                          color={
                            status === true
                              ? "green"
                              : "paid" === "pending"
                              ? "amber"
                              : "red"
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {surface}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {city}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {address}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit Appartement">
                        <Link to={`/dashboard/appartement/edit/${_id}`}>
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip content="Delete Appartement">
                        <IconButton
                          id={_id}
                          variant="text"
                          onClick={()=>handleDelete(_id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Appartment