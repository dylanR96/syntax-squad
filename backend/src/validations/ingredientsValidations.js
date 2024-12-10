import Joi from "joi";

export const addIngredientSchema = Joi.object({
  ingredientName: Joi.string().required(),
  stock: Joi.number().required(),
  units: Joi.string().required(),
  pricePerUnit: Joi.number().optional(),
  exchangeFor: Joi.string().optional(),
});

export const deleteIngredientSchema = Joi.object({
  ingredientID: Joi.number().integer().min(10000).max(99999).required(),
});

export const editIngredientSchema = Joi.object({
  ingredientID: Joi.number().integer().min(1000).max(99999).required(),
  ingredientName: Joi.string(),
  stock: Joi.number().optional(),
  units: Joi.string().optional(),
  pricePerUnit: Joi.number().optional(),
  exchangeFor: Joi.string().optional(),
});

export const getIngredientsByIdsSchema = Joi.object({
  ingredients: Joi.array().required(),
});
