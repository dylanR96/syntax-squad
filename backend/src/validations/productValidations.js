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
  price: Joi.number().required(),
  specialOffer: Joi.number().required(),
  image: Joi.string().required(),
  bakingTime: Joi.number().required(),
  description: Joi.string().required(),
  recipe: Joi.array().items(Joi.string().required()).required(),
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
  price: Joi.number().optional(),
  specialOffer: Joi.number().optional(),
  image: Joi.string().optional(),
  bakingTime: Joi.number().optional(),
  description: Joi.string().optional(),
  recipe: Joi.array().items(Joi.string().optional()).optional(),

});

export const deleteProductSchema = Joi.object({
  productID: Joi.number().integer().min(100).max(999).required(),
});
