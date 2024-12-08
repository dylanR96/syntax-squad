import { ingredientModel } from "../models/ingredientModel.js";
import { INGREDIENTS_TABLE } from "../constants/tableNames.js";

export const IngredientService = {
  addIngredient: async (ingredientData) => {
    return await ingredientModel.addIngredient(ingredientData);
  },
  getAllIngredients: async () => {
    return await ingredientModel.getAllIngredients();
  },
  getIngredientsByIds: async (ingredientData) => {
    const keys = ingredientData.ingredients.map((ingredient) => ({
      ingredientID: ingredient.id,
    }));
    const ingredients = await ingredientModel.getIngredientsByIds(keys);
    const enrichedIngredients = ingredients.map((ingredient) => {
      const matchingInput = ingredientData.ingredients.find(
        (input) => input.id === ingredient.ingredientID
      );

      return {
        ...ingredient,
        quantity: matchingInput.quantity,
      };
    });
    return enrichedIngredients;
  },
  deleteIngredient: async (ingredientData) => {
    const existingIngredient = await scanTable(ingredientData.ingredientData,  INGREDIENTS_TABLE, "ingredientID");
    if (!existingIngredient) {
      throw new Error("No such ingredient.");
    }
    return await ingredientModel.deleteIngredient(ingredientData);
  },

  editIngredient: async (ingredientData) => {
    const existingIngredient = await scanTable(ingredientData.ingredientData,  INGREDIENTS_TABLE, "ingredientID");
    if (!existingIngredient) {
      throw new Error("No such ingredient.");
    }
    return await ingredientModel.editIngredient(ingredientData);
  },
};
