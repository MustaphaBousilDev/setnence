const Bcrypt = require("../../config/bcrypt");
const { Auth } = require("../../entities");
const { authRepository } = require("../../fremworks/repository/mongo");

module.exports = () => {
  if (!authRepository) {
    throw new Error("The users repository should be exist in dependancies");
  }
  
  const execute = async (first_name, last_name, email, password) => {
    console.log('use Cases')
    console.log(password)
    try{
      console.log('try')
      // Ensure that the password is a valid string
      if (typeof password !== 'string') {
        console.log('password is not strung')
        throw new Response({
          status: 400,
          message: 'Invalid password',
          data: {},
        });
      }
      console.log('valid password')
      const hashedPassword =  await Bcrypt.hashPassword(password)
      const user = new Auth({
        first_name,
        last_name,
        email,
        password:hashedPassword 
      });
      console.log('useCase',user)
      return authRepository.add(user);
    }catch(error){
      console.log('error')
      return error 
    }
  };
  return { execute };
};
