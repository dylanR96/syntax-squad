import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT_INGREDIENTS } from "../../endpoints/apiEndpoints";

export interface Ingredient {
  ingredientID: number;
  ingredientName: string;
  stock: number;
  units: string;
  quantity: number | null;
  pricePerUnit: number;
  exchangeFor: string;
  checked: boolean;
}

interface IngredientState {
  ingredients: Ingredient[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: IngredientState = {
  ingredients: null,
  status: "idle",
  error: null,
};

// Async thunk för att hämta produkter
export const fetchIngredients = createAsyncThunk<
  Ingredient[],
  void,
  { rejectValue: string }
>("ingredients/fetchIngredients", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(ENDPOINT_INGREDIENTS);
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return rejectWithValue(
      "Kunde inte ladda ingredienser. Försök igen senare."
    );
  }
});

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Något gick fel.";
      });
  },
});

export default ingredientsSlice.reducer;
