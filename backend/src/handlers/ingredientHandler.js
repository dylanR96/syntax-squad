import { IngredientService } from "../services/ingredientService.js";
import { sendResponse } from "../utils/responseHelper.js";
import { tryCatchWrapper } from "../utils/tryCatchUtil.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  addIngredientSchema,
  deleteIngredientSchema,
  editIngredientSchema,
  getIngredientsByIdsSchema,
} from "../validations/ingredientsValidations.js";
import {
  authorizeAccess,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";

export const addIngredient = async (event) => {
  return tryCatchWrapper(async () => {
    await authorizeAdmin(event);
    const body = JSON.parse(event.body);
    const value = validateRequest(addIngredientSchema, body);
    await IngredientService.addIngredient(value);
    return sendResponse(200, "Ingredient successfully added");
  });
};

export const deleteIngredient = async (event) => {
  return tryCatchWrapper(async () => {
    await authorizeAdmin(event);
    const body = JSON.parse(event.body);
    const value = validateRequest(deleteIngredientSchema, body);
    await IngredientService.deleteIngredient(value);
    sendResponse(200, "Ingredient successfully removed");
  });
};

export const editIngredient = async (event) => {
  return tryCatchWrapper(async () => {
    await authorizeAdmin(event);
    const body = JSON.parse(event.body);
    const value = validateRequest(editIngredientSchema, body);
    const editedItem = await IngredientService.editIngredient(value);
    return sendResponse(200, editedItem);
  });
};

export const getIngredientsByIds = async (event) => {
  return tryCatchWrapper(async () => {
    await authorizeAccess(event);
    const body = JSON.parse(event.body);
    const value = validateRequest(getIngredientsByIdsSchema, body);
    const getIngredients = await IngredientService.getIngredientsByIds(value);
    return sendResponse(200, getIngredients);
  });
};

export const getAllIngredients = async (event) => {
  return tryCatchWrapper(async () => {
    await authorizeAccess(event);
    const getAllIngredients = await IngredientService.getAllIngredients();
    return sendResponse(200, getAllIngredients);
  });
};
