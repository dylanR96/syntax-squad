import { IngredientService } from "../services/ingredientService.js";
import { sendError, sendResponse } from "../utils/responseHelper.js";

export const addIngredient = async (event) => {
  try {
    const body = JSON.parse(event.body);
    await IngredientService.addIngredient(body);
    return sendResponse(200, "Ingredient successfully added");
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};
export const deleteIngredient = async (event) => {
  try {
    const body = JSON.parse(event.body);
    await IngredientService.deleteIngredient(body);
    return sendResponse(200, "Ingredient successfully removed");
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};
export const editIngredient = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const editedItem = await IngredientService.editIngredient(body);
    return sendResponse(200, editedItem);
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};
export const getIngredientsByIds = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const getIngredients = await IngredientService.getIngredientsByIds(body);
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
