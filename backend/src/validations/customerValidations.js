import Joi from "joi";

export const createCustomerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required(),
  password: Joi.string().required(),
  firstname: Joi.string().min(3).required(),
  surname: Joi.string().min(3).required(),
  address: Joi.string().required(),
  zipcode: Joi.string().required(),
  city: Joi.string().required(),
  phoneNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .required(),
});

export const customerLoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required(),
  password: Joi.string().required(),
});

// export const getCustomerSchema = Joi.object({
//   customerID: Joi.string().required(),
// });

// export const deleteCustomerSchema = Joi.object({
//   customerID: Joi.number().required(),
// });

export const editCustomerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .optional(),
  firstname: Joi.string().min(3).optional(),
  surname: Joi.string().min(3).optional(),
  address: Joi.string().optional(),
  zipcode: Joi.string().optional(),
  city: Joi.string().optional(),
  phoneNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .optional(),
});
