import Joi from "joi";

export const createProductSchema = Joi.object({
  productName: Joi.string().min(3).required(),
  ingredients: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().positive().required(),
        quantity: Joi.number().integer().positive().required(),
      })
    )
    .min(1)
    .required(),
  tags: Joi.array().items(Joi.string()).required(),
  price: Joi.string().required(),
  specialOffer: Joi.string().required(),
  description: Joi.string().required(),
});

export const getProductSchema = Joi.object({
  productID: Joi.number().integer().min(100).max(999).required(),
});

export const editProductSchema = Joi.object({
  productID: Joi.number().integer().min(100).max(999).required(),
  productName: Joi.string().min(3).optional(),
  ingredients: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().positive().required(),
        quantity: Joi.number().integer().positive().required(),
      })
    )
    .min(1)
    .optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  price: Joi.string().optional(),
  specialOffer: Joi.string().optional(),
  description: Joi.string().optional(),
});

export const deleteProductSchema = Joi.object({
  productID: Joi.number().integer().min(100).max(999).required(),
});
