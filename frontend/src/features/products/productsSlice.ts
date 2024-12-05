import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface ProductIngredient {
    id: number;      // ID för ingrediensen
    quantity: number; // Mängd av ingrediensen
  }

export interface Product {
  productID: number;
  productName: string;
  description: string;
  price: number;
  image: string;
  bakingTime: string;
  tags: string[];
  ingredients: ProductIngredient[];
  recipe: string[];
}

interface ProductsState {
  products: Product[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  products: null,
  status: 'idle',
  error: null,
};

// Async thunk för att hämta produkter
export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://4pewmd0k46.execute-api.eu-north-1.amazonaws.com/products');
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue('Kunde inte ladda produkter. Försök igen senare.');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Något gick fel.';
      });
  },
});

export default productsSlice.reducer;
