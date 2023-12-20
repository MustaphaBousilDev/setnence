import {Card,Button,Typography} from "@material-tailwind/react";
import clients from "../constants/clients";
import CustomInput from "../components/common/Input";
import ClientService from "./client.service";
const AddClient = () => {
  const {submet,handleChange,handleSubmit,clientStatus} =ClientService()
  return (
    <Card color="transparent" shadow={false} className="  bg-black p-8">
      <Typography variant="h4" color="blue-gray" className=" text-white text-center">
        {"Add Appartement"}
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        {"Add new appartement"}
      </Typography>
      <form onSubmit={handleSubmit}  className="mt-8 mb-2 flex flex-col  gap-4 w-[70%] mx-auto">
          {
            clients.map((item,index)=>{
              return (
                <div className="w-full" key={index}>
                  <CustomInput
                    key={index}
                    icon={<item.icon/>} 
                    type={item.type} 
                    name={item.name}
                    id={item.id}
                    placeholder={item.placeholder} 
                    onChange={handleChange}
                    className={`${item.className}  bg-gray-700 placeholder:text-gray-400 `}
                    submit={submet}
                    validate={clientStatus[item.name].error}
                    errorMessage={clientStatus[item.name].message}
                  />
                </div>
              )
            })
          }

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

export default AddClient