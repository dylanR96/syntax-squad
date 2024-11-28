import Joi from "joi";

export const createProductSchema = Joi.object({
  productName: Joi.string().min(3).required(),
  ingredients: Joi.array()
    .items(
      Joi.object().pattern(
        Joi.string(),
        Joi.object({
          quantity: Joi.number().integer().min(1).required(),
          exclude: Joi.array().items(Joi.string().optional()).required(),
          extra: Joi.array()
            .items(
              Joi.object().pattern(
                Joi.string().pattern(/^\d+$/),
                Joi.string().pattern(/^\d+kr$/)
              )
            )
            .required(),
        })
      )
    )
    .min(1)
    .required(),
  tags: Joi.array().items(Joi.string().required()).required(),
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
      Joi.object().pattern(
        Joi.string(),
        Joi.object({
          quantity: Joi.number().integer().min(1).required(),
          exclude: Joi.array().items(Joi.string().optional()).required(),
          extra: Joi.array()
            .items(
              Joi.object().pattern(
                Joi.string().pattern(/^\d+$/),
                Joi.string().pattern(/^\d+kr$/)
              )
            )
            .required(),
        })
      )
    )
    .min(1)
    .required(),
  tags: Joi.array().items(Joi.string().optional()).optional(),
  price: Joi.string().optional(),
  specialOffer: Joi.string().optional(),
  description: Joi.string().optional(),
  });
  
  export const deleteProductSchema = Joi.object({
    productID: Joi.number().integer().min(100).max(999).required(),
  });