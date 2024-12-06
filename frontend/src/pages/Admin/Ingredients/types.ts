export type IngredientType = {
  createdAt: string;
  exchangeFor: string;
  ingredientID: number;
  ingredientName: string;
  pricePerUnit: number;
  stock: number;
  units: string;
};

export type EditIngredientType = {
  ingredientID: number;
  ingredientName: string;
  stock: number;
  units: string;
};
export type NewIngredientType = {
  ingredientName: string;
  stock: number;
  units: string;
};
export type EventFn = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
