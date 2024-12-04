import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { recipes } from '../../pages/Recipe/recipes';

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

interface OrderState {
  items: RecipeIngredients[];
}

const initialState: OrderState = {
  items: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addRecipeIngredients: (
  state,
  action: PayloadAction<{ recipe: string; ingredients: Ingredient[] }>
) => {
  const { recipe, ingredients } = action.payload;

  // Filtrera ingredienser som har `checked: true`
  const checkedIngredients = ingredients.filter(ingredient => ingredient.checked);

  if (checkedIngredients.length > 0) {
    // Kontrollera om receptet redan finns i state
    const existingRecipe = state.items.find(item => item.recipe === recipe);

    if (!existingRecipe) {
      // Lägg till ett nytt recept med endast de checkade ingredienserna
      state.items.push({ recipe, ingredients: checkedIngredients });
    } else {
      // Om receptet redan finns, uppdatera endast med de checkade ingredienserna
      existingRecipe.ingredients = [
        ...existingRecipe.ingredients.filter(ing => ing.checked), // Behåll bara markerade ingredienser
        ...checkedIngredients.filter(
          ing => !existingRecipe.ingredients.some(existingIng => existingIng.id === ing.id)
        ),
      ];
    }
  }
    
      // Logga state efter uppdatering
      console.log(
        'State after adding recipe ingredients:',
        JSON.stringify(state.items.filter(item => item.ingredients.length > 0), null, 2)
      );
    },
    toggleIngredient: (state, action: PayloadAction<{ recipe: string; ingredientName: string }>) => {
      const { recipe, ingredientName } = action.payload;
    
      const recipeItem = state.items.find(item => item.recipe === recipe);
      if (recipeItem) {
        const ingredient = recipeItem.ingredients.find(i => i.name === ingredientName);
        if (ingredient) {
          ingredient.checked = !ingredient.checked; // Toggla `checked`
        }
      }
    },
  },
});

export const { addRecipeIngredients, toggleIngredient } = orderSlice.actions;
export default orderSlice.reducer;









/* 



const handleSubmit = () => {
    dispatch(
      addRecipeIngredients({
        recipe: 'kladdkaka',
        ingredients: [
          { id: '1', name: '100 g smör', quantity: '100 g', checked: false },
          { id: '2', name: '2 st ägg', quantity: '2 st', checked: false },
          { id: '3', name: '2 1/2 dl strösocker', quantity: '2 1/2 dl', checked: false },
          { id: '4', name: '3 msk kakao', quantity: '3 msk', checked: false },
          { id: '5', name: '2 tsk vaniljsocker', quantity: '2 tsk', checked: false },
          { id: '6', name: '1 1/2 dl vetemjöl', quantity: '1 1/2 dl', checked: false },
          { id: '7', name: '1 krm salt', quantity: '1 krm', checked: false },
        ],
      })
    );
  };






*/