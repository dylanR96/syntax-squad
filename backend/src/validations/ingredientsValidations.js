import Joi from "joi";

export const addIngredientSchema = Joi.object({
  ingredientName: Joi.string().required(),
  stock: Joi.number().required(),
  units: Joi.number().required(),
  pricePerUnit: Joi.number().required(),
  exchangeFor: Joi.string().required(),
});

export const deleteIngredientSchema = Joi.object({
  ingredientID: Joi.number().integer().min(10000).max(99999).required(),
});

export const editIngredientSchema = Joi.object({
  ingredientID: Joi.number().integer().min(1000).max(9999).required(),
  stock: Joi.number().optional(),
  units: Joi.number().optional(),
  pricePerUnit: Joi.number().optional(),
  exchangeFor: Joi.string().optional(),
});

export const getIngredientsByIdsSchema = Joi.object({
  ingredientID: Joi.number().integer().min(10000).max(99999).required(),
});
