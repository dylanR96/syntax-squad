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
  exclude: number[];
  price: number; //Price här är inte samma som price i själva produkten.
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
      action: PayloadAction<{
        productID: number;
        ingredients: Ingredient[];
        productPrice: number;
      }>
    ) => {
      const { productID, ingredients, productPrice } = action.payload;

      // Skapa en exclude-lista baserat på de ingredienser som inte är markerade
      const excludeList = ingredients
        .filter((ing) => !ing.checked)
        .map((ing) => ing.ingredientID);

      //Räkna ut priset på beställd vara
      const totalExludePrice = 5 * excludeList.length;
      const totalCost = productPrice - totalExludePrice;

      const existingProduct = state.products.find(
        (item) => item.productID === productID
      );

      // Om produkten inte finns i ordern, lägg till den
      if (!existingProduct) {
        state.products.push({
          productID,
          quantity: 1,
          exclude: excludeList,
          price: totalCost,
        });
        //Om produkten finns i ordern, uppdatera exclude-listan och priset
      } else {
        existingProduct.exclude = excludeList;
        existingProduct.price = totalCost;
      }

      updateTotalPrice(state); // Uppdatera totala priset
    },
    toggleIngredient: (
      state,
      action: PayloadAction<{ productID: number; excludeIngredientID: number }>
    ) => {
      const { productID, excludeIngredientID } = action.payload;

      // Hitta produkten baserat på productID
      const product = state.products.find(
        (item) => item.productID === productID
      );

      //Om produkten hittas, uppdatera exclude-listan
      if (product) {
        const ingredientIndex = product.exclude.findIndex(
          (excludeID) => excludeID === excludeIngredientID
        );

        console.log("ingredientIndex:", ingredientIndex);
        //Om ingrediens finns i exclude listan, ta bort den, annars lägg till den.
        if (ingredientIndex !== -1) {
          product.exclude.splice(ingredientIndex, 1);
        } else {
          product.exclude.push(excludeIngredientID);
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
        // Räkna ut priset per enhet
        const unitPrice = product.price / product.quantity;

        // Öka kvantiteten
        product.quantity += 1;

        // Uppdatera priset baserat på den nya kvantiteten
        product.price = product.quantity * unitPrice;
      }

      updateTotalPrice(state); // Uppdatera totala priset
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      // Få fram produktens index i ordern
      const productIndex = state.products.findIndex(
        (item) => item.productID === action.payload
      );

      // Om produkten finns i ordern, minska kvantiteten
      if (productIndex !== -1) {
        const product = state.products[productIndex];

        // Om kvantiteten är större än 1, minska kvantiteten och uppdatera priset
        if (product.quantity > 1) {
          const unitPrice = product.price / product.quantity;
          product.quantity -= 1;
          product.price = product.quantity * unitPrice;

          // Om kvantiteten är 1, ta bort produkten
        } else {
          state.products.splice(productIndex, 1); // Ta bort produkten
        }
      }

      updateTotalPrice(state); // Uppdatera totala priset
    },
    addInfo: (
      state,
      action: PayloadAction<{
        comment: string;
        address: string;
        zipcode: string;
        city: string;
        phoneNumber: string;
      }>
    ) => {
      state.comment = action.payload.comment;
      state.address = action.payload.address;
      state.zipcode = action.payload.zipcode;
      state.city = action.payload.city;
      state.phoneNumber = action.payload.phoneNumber;
    },
  },
});

/* 

action: PayloadAction<{
        productID: number;
        ingredients: Ingredient[];
        productPrice: number;
      }>
    ) => {
      const { productID, ingredients, productPrice } = action.payload;

*/

export const {
  addRecipeIngredients,
  toggleIngredient,
  increaseQuantity,
  decreaseQuantity,
  addInfo,
} = orderSlice.actions;
export default orderSlice.reducer;
