import { INGREDIENTS_TABLE } from "../constants/tableNames.js";

let ingredientID = 10001;
const bakingIngredients = [
  {
    ingredientName: "Vetemjöl",
    stock: 10000,
    units: "gram",
    pricePerUnit: 0.0075,
  }, // Flour
  {
    ingredientName: "Socker",
    stock: 8000,
    units: "gram",
    pricePerUnit: 0.01,
  }, // Sugar
  {
    ingredientName: "Brun Farin",
    stock: 3000,
    units: "gram",
    pricePerUnit: 0.02,
  }, // Brown Sugar
  {
    ingredientName: "Smör",
    stock: 5000,
    units: "gram",
    pricePerUnit: 0.045,
  }, // Butter
  {
    ingredientName: "Bakpulver",
    stock: 1000,
    units: "gram",
    pricePerUnit: 0.05,
  }, // Baking Powder
  {
    ingredientName: "Bikarbonat",
    stock: 800,
    units: "gram",
    pricePerUnit: 0.04,
  }, // Baking Soda
  {
    ingredientName: "Vaniljsocker",
    stock: 1000,
    units: "gram",
    pricePerUnit: 0.06,
  }, // Vanilla Sugar
  {
    ingredientName: "Kakao",
    stock: 2000,
    units: "gram",
    pricePerUnit: 0.12,
  }, // Cocoa Powder
  {
    ingredientName: "Chokladknappar",
    stock: 2000,
    units: "gram",
    pricePerUnit: 0.15,
  }, // Chocolate Chips
  {
    ingredientName: "Ägg",
    stock: 300,
    units: "styck",
    pricePerUnit: 2.0,
  }, // Eggs
  {
    ingredientName: "Mjölk",
    stock: 5000,
    units: "milliliter",
    pricePerUnit: 0.0125,
  }, // Milk
  {
    ingredientName: "Grädde",
    stock: 2000,
    units: "milliliter",
    pricePerUnit: 0.018,
  }, // Cream
  {
    ingredientName: "Jäst",
    stock: 500,
    units: "gram",
    pricePerUnit: 0.08,
  }, // Yeast
  {
    ingredientName: "Rapsolja",
    stock: 3000,
    units: "milliliter",
    pricePerUnit: 0.02,
  }, // Rapeseed Oil
  {
    ingredientName: "Honung",
    stock: 1500,
    units: "gram",
    pricePerUnit: 0.09,
  }, // Honey
  {
    ingredientName: "Kardemumma",
    stock: 500,
    units: "gram",
    pricePerUnit: 0.25,
  }, // Cardamom
  {
    ingredientName: "Kanel",
    stock: 800,
    units: "gram",
    pricePerUnit: 0.12,
  }, // Cinnamon
  {
    ingredientName: "Mandelmjöl",
    stock: 2000,
    units: "gram",
    pricePerUnit: 0.35,
  }, // Almond Flour
  {
    ingredientName: "Florsocker",
    stock: 2000,
    units: "gram",
    pricePerUnit: 0.02,
  }, // Powdered Sugar
  {
    ingredientName: "Salt",
    stock: 1000,
    units: "gram",
    pricePerUnit: 0.005,
  }, // Salt
];
const batchWriteRequests = bakingIngredients.map((ingredient) => ({
  PutRequest: {
    Item: {
      ingredientID: ingredientID++,
      ingredientName: ingredient.ingredientName,
      stock: ingredient.stock,
      units: ingredient.units,
      pricePerUnit: ingredient.pricePerUnit,
      createdAt: new Date().toISOString(),
    },
  },
}));

export const ingredientParams = {
  RequestItems: {
    [INGREDIENTS_TABLE]: batchWriteRequests,
  },
};
