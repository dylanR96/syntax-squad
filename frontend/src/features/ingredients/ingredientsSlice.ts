import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
}

interface RecipeIngredients {
  recipe: string;
  ingredients: Ingredient[];
}

interface IngredientsState {
  items: RecipeIngredients[];
}

const initialState: IngredientsState = {
  items: [],
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addRecipeIngredients: (
      state,
      action: PayloadAction<{ recipe: string; ingredients: Ingredient[] }>
    ) => {
      const { recipe, ingredients } = action.payload;
      state.items.push({ recipe, ingredients });
    },
    toggleIngredient: (
      state,
      action: PayloadAction<{ recipe: string; ingredientId: string }>
    ) => {
      const { recipe, ingredientId } = action.payload;
      const recipeItem = state.items.find(item => item.recipe === recipe);
      if (recipeItem) {
        const ingredient = recipeItem.ingredients.find(i => i.id === ingredientId);
        if (ingredient) {
          ingredient.checked = !ingredient.checked;
        }
      }
    },
  },
});

export const { addRecipeIngredients, toggleIngredient } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;