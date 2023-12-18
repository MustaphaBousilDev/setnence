const joi = require("joi");

module.exports.Request = class Request {
  appartement = () => {
    return joi.object({
      id: joi.any(),
      number: joi.string().required(),
      price: joi.number().required(),
      city: joi.string().required(),
      address: joi.string().required(),
      status: joi.boolean().required(),
      surface: joi.number().required(),
      rooms: joi.number().required(),
      bedrooms: joi.number().required(),
      parking: joi.boolean().required(),
      garden: joi.boolean().required(),
      user: joi.string().required(),
    });
  };

  client = () => {
    return joi.object({
      id: joi.any(),
      cin: joi.string().required(),
      first_name: joi.string().required(),
      last_name: joi.string().required(),
      email: joi.string().required(),
      phone: joi.string().required(),
      user: joi.string().required(),
    });
  };

  paiement = () => {
    return joi.object({
      id: joi.any(),
      client: joi.string().required(),
      appartement: joi.string().required(),
      montant: joi.number().required(),
      datePaiement: joi.date().required(),
      user: joi.string().required(),
    });
  };
};
