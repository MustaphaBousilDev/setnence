import {Card,Button,Typography,List,ListItem,} from "@material-tailwind/react";
import { Switch } from "@material-tailwind/react";
import appartementInput from "../constants/appartement";
import CustomInput from "../components/common/Input";
import AppartemnetService from './appartement.service'

const AddApartment = () => {
  const {submet,handleChange,handleSubmit,appertementStatus} =AppartemnetService()
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
            appartementInput.map((item,index)=>{
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

export default AddApartment