import { Card, Input, Button, Typography, Spinner } from "@material-tailwind/react";
import axios from "axios";
import { useQuery } from "react-query";
// import { PaiementService } from "./paiementService";
import PaymentService from "./payment.service";

const AddPayment=()=>{
  const { 
    handleChange,
    payment,
    handleSubmit
  } = PaymentService()
  const fetchAppartments = async () => {
    const response = await axios.get(`http://localhost:4000/api/v1/appartement/${localStorage.getItem('token')}`); // Replace with your actual API endpoint
    return response.data;
  };
  const fetchClients = async () => {
    const response = await axios.get(`http://localhost:4000/api/v1/client/${localStorage.getItem('token')}`); // Replace with your actual API endpoint
    return response.data;
  };

  

  

  const { data:appPay, isLoading:loadingAppa, refetch:refetch1 } = useQuery("appPay", fetchAppartments);
  const { data:cliePay, isLoading:loadingClien, refetch:refetch2 } = useQuery("cliePay", fetchClients);
  if (loadingAppa || loadingClien) {
    return <Spinner color="blue" size="large" />;
  }
  // console.log(appPay)
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        {"Add Paiement"}
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        {"Add new Paiement"}
      </Typography>
      <form 
        onSubmit={handleSubmit} 
        className="mt-8 mb-2 w-full"
      >
        <div className="my-4 flex items-center gap-4 w-full">
          <div className="w-full">
            <select
              size="lg"
              label="Select Client"
              name="client"
              className=" w-full p-3 border rounded-lg"
              value={payment.client}
              onChange={handleChange}
            >
              {cliePay.data.map(({ _id, first_name, last_name, image }) => (
                <option
                  key={_id}
                  value={_id}
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={image}
                      alt={first_name}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    {first_name + " " + last_name}
                  </div>
                </option>
                
              ))}
            </select>
          </div>
          <div className="w-full">
            <select
              size="lg"
              label="Select Appartement"
              name="appartement"
              className=" w-full p-3 border rounded-lg"
              value={payment.appartement}
              onChange={handleChange}
            >
              {appPay.data.map(({ _id, number, image, status }) => (
                <option
                  key={_id}
                  value={_id}
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={image}
                      alt={number}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    {number}
                  </div>
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="my-4 flex items-center gap-4 w-full mt-4">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Montant
            </Typography>
            <Input
              maxLength={5}
              type="number"
              required
              placeholder="montant"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleChange}
              name="montant"
            />
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


export default AddPayment