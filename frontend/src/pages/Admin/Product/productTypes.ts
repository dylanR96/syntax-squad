export type ProductIngredientType = {
  id: number;
  quantity: number;
};
export type ProductType = {
  productName: string;
  bakingTime: number;
  createdAt?: string;
  description: string;
  image: string;
  ingredients: ProductIngredientType[];
  price: number;
  productID?: number;
  specialOffer: number;
  recipe: string[];
  tags: string[];
};
export type EventFn = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;
export const initProduct: ProductType = {
  productName: "",
  bakingTime: 0,
  description: "",
  image: "",
  ingredients: [],
  price: 0,
  productID: 0,
  specialOffer: 0,
  recipe: ["hej"],
  tags: ["", "", ""],
};
export type ChangeIngredientType = {
  createdAt: string;
  exchangeFor: string;
  ingredientID: number;
  ingredientName: string;
  stock: number;
  quantity: number;
  units: string;
};
