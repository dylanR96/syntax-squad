import { IngredientService } from "../services/ingredientService.js";
import { sendError, sendResponse } from "../utils/responseHelper.js";
import { addIngredientSchema, deleteIngredientSchema, editIngredientSchema, getIngredientsByIdsSchema } from "../validations/ingredientsValidations.js";

export const addIngredient = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { error, value } = addIngredientSchema.validate(body);
    if (error) {
      return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
    }
    await IngredientService.addIngredient(value);
    return sendResponse(200, "Ingredient successfully added");
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};
export const deleteIngredient = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { error, value } = deleteIngredientSchema.validate(body);
    if (error) {
      return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
    }
    await IngredientService.deleteIngredient(value);
    return sendResponse(200, "Ingredient successfully removed");
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};
export const editIngredient = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { error, value } = editIngredientSchema.validate(body);
    if (error) {
      return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
    }
    const editedItem = await IngredientService.editIngredient(value);
    return sendResponse(200, editedItem);
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};
export const getIngredientsByIds = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { error, value } = getIngredientsByIdsSchema.validate(body);
    if (error) {
      return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
    }
    const getIngredients = await IngredientService.getIngredientsByIds(value);
    return sendResponse(200, getIngredients);
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};
export const getAllIngredients = async () => {
  try {
    const getAllIngredients = await IngredientService.getAllIngredients();
    return sendResponse(200, getAllIngredients);
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};
const test = {
  ingredientIDs: [10004, 10005],
};
