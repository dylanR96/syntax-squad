import Joi from "joi";

export const createOrderSchema = Joi.object({
  userID: Joi.string().required(),
  products: Joi.array()
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
  comment: Joi.string().optional(),
  price: Joi.string().required(),
  address: Joi.string().required(),
  zipcode: Joi.string().required(),
  city: Joi.string().required(),
  phoneNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .required(),
});

export const changeOrderSchema = Joi.object({
  orderNO: Joi.number().integer().min(1000).max(9999).required(),
  products: Joi.array()
    .items(
      Joi.object().pattern(
        Joi.string(),
        Joi.object({
          quantity: Joi.number().integer().min(1).optional(),
          exclude: Joi.array().items(Joi.string().required()).optional(),
          extra: Joi.array()
            .items(
              Joi.object({
                [Joi.string().pattern(/^\d+$/).optional()]: Joi.string()
                  .pattern(/^\d+kr$/)
                  .optional(),
              })
            )
            .optional(),
        })
      )
    )
    .min(1)
    .required(),
  comment: Joi.string().optional(),
  price: Joi.number().positive().optional(),
  address: Joi.string().optional(),
  zipcode: Joi.string().optional(),
  city: Joi.string().optional(),
  phoneNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .optional(),
});

export const deleteOrderSchema = Joi.object({
  orderNO: Joi.number().integer().min(1000).max(9999).required(),
});

export const changeStatusSchema = Joi.object({
  status: Joi.string().required(),
});

export const getOrderSchema = Joi.object({
  orderNO: Joi.number().integer().min(1000).max(9999).required(),
});
