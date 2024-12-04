import Joi from "joi";

export const createAdminSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required(),
  password: Joi.string().required(),
});

export const loginAdminSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required(),
  password: Joi.string().required(),
});

export const editAdminSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required(),
});