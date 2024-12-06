import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Ingredient {
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
  productID: number;
  quantity: number;
  exclude: Record<number, number>[];
  price: number;
}

interface Item {
  products: Product[];
  comment: string;
  price: number;
  address: string;
  zipcode: string;
  city: string;
  phoneNumber: string;
}

const initialState: Item = {
  products: [],
  comment: "",
  price: 0,
  address: "",
  zipcode: "",
  city: "",
  phoneNumber: "",
};

// Hjälpfunktion för att uppdatera totala priset
const updateTotalPrice = (state: Item) => {
  state.price = state.products.reduce(
    (total, product) => total + product.price,
    0
  );
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addRecipeIngredients: (
      state,
      action: PayloadAction<{ productID: number; ingredients: Ingredient[] }>
    ) => {
      const { productID, ingredients } = action.payload;

      const totalCost = ingredients.reduce((sum, ing) => {
        const quantity = ing.quantity ?? 0;
        return sum + (ing.checked ? quantity * ing.pricePerUnit : 0);
      }, 0);

      const excludeList = ingredients
        .filter((ing) => !ing.checked)
        .map((ing) => ({
          [ing.ingredientID]: ing.pricePerUnit,
        }));

      const existingProduct = state.products.find(
        (item) => item.productID === productID
      );

      if (!existingProduct) {
        state.products.push({
          productID,
          quantity: 1,
          exclude: excludeList,
          price: Math.round(totalCost),
        });
      } else {
        existingProduct.exclude = excludeList;
        existingProduct.price = Math.round(totalCost);
      }

      updateTotalPrice(state); // Uppdatera totala priset
    },
    toggleIngredient: (
      state,
      action: PayloadAction<{ productID: number; excludeIngredientID: number }>
    ) => {
      const { productID, excludeIngredientID } = action.payload;

      const product = state.products.find(
        (item) => item.productID === productID
      );

      if (product) {
        const ingredientIndex = product.exclude.findIndex(
          (exclude) => Number(Object.keys(exclude)[0]) === excludeIngredientID
        );

        if (ingredientIndex !== -1) {
          product.exclude.splice(ingredientIndex, 1);
        } else {
          product.exclude.push({ [excludeIngredientID]: 0 });
        }
      } else {
        console.error(
          `Product with productID ${productID} not found in state.`
        );
      }

      updateTotalPrice(state); // Uppdatera totala priset
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.products.find(
        (item) => item.productID === action.payload
      );
      if (product) {
        const unitPrice = product.price / product.quantity;
        product.quantity += 1;
        product.price = Math.round(product.quantity * unitPrice);
      }

      updateTotalPrice(state); // Uppdatera totala priset
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productIndex = state.products.findIndex(
        (item) => item.productID === action.payload
      );

      if (productIndex !== -1) {
        const product = state.products[productIndex];

        if (product.quantity > 1) {
          const unitPrice = product.price / product.quantity;
          product.quantity -= 1;
          product.price = Math.round(product.quantity * unitPrice);
        } else {
          state.products.splice(productIndex, 1); // Ta bort produkten
        }
      }

      updateTotalPrice(state); // Uppdatera totala priset
    },
    addComment: (state, action: PayloadAction<string>) => {
      state.comment = action.payload;
    },
  },
});

export const {
  addRecipeIngredients,
  toggleIngredient,
  increaseQuantity,
  decreaseQuantity,
  addComment,
} = orderSlice.actions;
export default orderSlice.reducer;
