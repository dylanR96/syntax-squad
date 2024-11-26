import { ingredientModel } from "../models/ingredientModel.js";

export const IngredientService = {
  addIngredient: async (ingredientData) => {
    //validering(middleware)
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
    return await ingredientModel.deleteIngredient(ingredientData);
  },

  editIngredient: async (ingredientData) => {
    //validering(middleware)
    // Needs to check if the ingredientData.ingredientID exists
    return await ingredientModel.editIngredient(ingredientData);
  },
  // getAdmin: async (data) => {
  //     //validering(middleware)
  //     return await adminModel.getAdmin(data);
  //   }
};
