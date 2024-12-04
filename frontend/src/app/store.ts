import { configureStore } from '@reduxjs/toolkit';
import orderReducer from '../features/order/orderSlice';
import productsReducer from '../features/products/productsSlice'; 
import ingrediensReducer from '../features/ingredients/ingredientsSlice'; 

export const store = configureStore({
  reducer: {
    order: orderReducer,
    products: productsReducer,
    ingredients: ingrediensReducer,
  },
});

// Typer för användning i hela appen
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;