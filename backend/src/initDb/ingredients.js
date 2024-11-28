import { INGREDIENTS_TABLE } from "../constants/tableNames.js";

let ingredientID = 10001;
const bakingIngredients = [
  {
    ingredientName: "Vetemjöl",
    stock: 10000,
    units: "grams",
    pricePerUnit: 0.0075,
    exchangeFor: "SEK",
  }, // Flour
  {
    ingredientName: "Socker",
    stock: 8000,
    units: "grams",
    pricePerUnit: 0.01,
    exchangeFor: "SEK",
  }, // Sugar
  {
    ingredientName: "Brun Farin",
    stock: 3000,
    units: "grams",
    pricePerUnit: 0.02,
    exchangeFor: "SEK",
  }, // Brown Sugar
  {
    ingredientName: "Smör",
    stock: 5000,
    units: "grams",
    pricePerUnit: 0.045,
    exchangeFor: "SEK",
  }, // Butter
  {
    ingredientName: "Bakpulver",
    stock: 1000,
    units: "grams",
    pricePerUnit: 0.05,
    exchangeFor: "SEK",
  }, // Baking Powder
  {
    ingredientName: "Bikarbonat",
    stock: 800,
    units: "grams",
    pricePerUnit: 0.04,
    exchangeFor: "SEK",
  }, // Baking Soda
  {
    ingredientName: "Vaniljsocker",
    stock: 1000,
    units: "grams",
    pricePerUnit: 0.06,
    exchangeFor: "SEK",
  }, // Vanilla Sugar
  {
    ingredientName: "Kakao",
    stock: 2000,
    units: "grams",
    pricePerUnit: 0.12,
    exchangeFor: "SEK",
  }, // Cocoa Powder
  {
    ingredientName: "Chokladknappar",
    stock: 2000,
    units: "grams",
    pricePerUnit: 0.15,
    exchangeFor: "SEK",
  }, // Chocolate Chips
  {
    ingredientName: "Ägg",
    stock: 300,
    units: "pieces",
    pricePerUnit: 2.0,
    exchangeFor: "SEK",
  }, // Eggs
  {
    ingredientName: "Mjölk",
    stock: 5000,
    units: "milliliters",
    pricePerUnit: 0.0125,
    exchangeFor: "SEK",
  }, // Milk
  {
    ingredientName: "Grädde",
    stock: 2000,
    units: "milliliters",
    pricePerUnit: 0.018,
    exchangeFor: "SEK",
  }, // Cream
  {
    ingredientName: "Jäst",
    stock: 500,
    units: "grams",
    pricePerUnit: 0.08,
    exchangeFor: "SEK",
  }, // Yeast
  {
    ingredientName: "Rapsolja",
    stock: 3000,
    units: "milliliters",
    pricePerUnit: 0.02,
    exchangeFor: "SEK",
  }, // Rapeseed Oil
  {
    ingredientName: "Honung",
    stock: 1500,
    units: "grams",
    pricePerUnit: 0.09,
    exchangeFor: "SEK",
  }, // Honey
  {
    ingredientName: "Kardemumma",
    stock: 500,
    units: "grams",
    pricePerUnit: 0.25,
    exchangeFor: "SEK",
  }, // Cardamom
  {
    ingredientName: "Kanel",
    stock: 800,
    units: "grams",
    pricePerUnit: 0.12,
    exchangeFor: "SEK",
  }, // Cinnamon
  {
    ingredientName: "Mandelmjöl",
    stock: 2000,
    units: "grams",
    pricePerUnit: 0.35,
    exchangeFor: "SEK",
  }, // Almond Flour
  {
    ingredientName: "Florsocker",
    stock: 2000,
    units: "grams",
    pricePerUnit: 0.02,
    exchangeFor: "SEK",
  }, // Powdered Sugar
  {
    ingredientName: "Salt",
    stock: 1000,
    units: "grams",
    pricePerUnit: 0.005,
    exchangeFor: "SEK",
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
      exchangeFor: ingredient.exchangeFor,
      createdAt: new Date().toISOString(),
    },
  },
}));

export const ingredientParams = {
  RequestItems: {
    [INGREDIENTS_TABLE]: batchWriteRequests,
  },
};
