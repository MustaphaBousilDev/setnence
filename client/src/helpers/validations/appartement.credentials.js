import { validateString, validatePositiveInteger } from "../validations"

export const validateCredentials=(number,rooms,bedrooms,address,city,price,surface)=>{
    const validateNumber=validateString(number)
    const validateRooms=validatePositiveInteger(rooms)
    const validateBedRooms=validatePositiveInteger(bedrooms)
    const validateAddress=validateString(address)
    const validateCity=validateString(city)
    const validatePrice=validatePositiveInteger(price)
    const validateSurface=validatePositiveInteger(surface)

    return [
      {
        number:{
          error:validateNumber.error,
          message:validateNumber.message
        },
        rooms:{
          error:validateRooms.error,
          message:validateRooms.message
        },
        bedrooms:{
          error:validateBedRooms.error,
          message:validateBedRooms.message
        },
        address:{
          error:validateAddress.error,
          message:validateAddress.message
        },
        city:{
          error:validateCity.error,
          message:validateCity.message
        },
        price:{
          error:validatePrice.error,
          message:validatePrice.message
        },
        surface:{
          error:validateSurface.error,
          message:validateSurface.message
        }
      }
    ]
  }