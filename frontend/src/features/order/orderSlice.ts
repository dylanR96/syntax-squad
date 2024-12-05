import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Ingredient{
  ingredientID: number;
  ingredientName: string;
  stock: number;
  units: string;
  quantity: number | null;
  pricePerUnit: number;
  exchangeFor: string;
  checked: boolean;
}

interface Product {
  recipeID: number;
  quantity: number;
  exclude: Record<number, number>[];
  price: number;
}

interface OrderState {
  items: Product[]; // items innehåller fullständig information om varje produkt
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
      action: PayloadAction<{ recipeID: number; ingredients: Ingredient[] }>
    ) => {
      const { recipeID, ingredients } = action.payload;
    
      // Beräkna total kostnad och exclude-lista
      const totalCost = ingredients.reduce((sum, ing) => {
        const quantity = ing.quantity ?? 0;
        return sum + (ing.checked ? quantity * ing.pricePerUnit : 0);
      }, 0);
    
      const excludeList = ingredients
        .filter((ing) => !ing.checked)
        .map((ing) => ({
          [ing.ingredientID]: ing.pricePerUnit,
        }));
    
      // Skapa eller uppdatera produkten i state.items
      const existingProduct = state.items.find((item) => item.recipeID === recipeID);
    
      if (!existingProduct) {
        // Om produkten inte finns, lägg till den
        state.items.push({
          recipeID,
          quantity: 1,
          exclude: excludeList,
          price: Math.round(totalCost),
        });
      } else {
        // Uppdatera existerande produkt
        existingProduct.exclude = excludeList;
        existingProduct.price = Math.round(totalCost);
      }
    
      console.log("Updated Global State:", JSON.stringify(state.items, null, 2));
    },
    toggleIngredient: (
      state,
      action: PayloadAction<{ recipeID: number; excludeIngredientID: number }>
    ) => {
      const { recipeID, excludeIngredientID } = action.payload;
    
      // Hitta rätt produkt i state.items
      const product = state.items.find((item) => item.recipeID === recipeID);
    
      if (product) {
        // Uppdatera exclude-listan för produkten
        const ingredientIndex = product.exclude.findIndex(
          (exclude) => Number(Object.keys(exclude)[0]) === excludeIngredientID
        );
    
        if (ingredientIndex !== -1) {
          // Ta bort ingrediensen från exclude om den redan finns där
          product.exclude.splice(ingredientIndex, 1);
        } else {
          // Lägg till ingrediensen i exclude
          product.exclude.push({ [excludeIngredientID]: 0 }); // Prisvärde kan justeras
        }
      } else {
        console.error(`Product with recipeID ${recipeID} not found in state.`);
      }
    },
  },
});

export const { addRecipeIngredients, toggleIngredient } = orderSlice.actions;
export default orderSlice.reducer;


