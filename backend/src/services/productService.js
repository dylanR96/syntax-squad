import { productModel } from "../models/productModel.js";

export const ProductService = {
  createProduct: async (productData) => {
    //validering(middleware)
    return await productModel.createProduct(productData);
  },
  getAllProducts: async () => {
    return await productModel.getAllProducts();
  },
  getProduct: async (productID) => {
    return await productModel.getProduct(productID);
  },
  editProduct: async (productData) => {
    return await productModel.editProduct(productData);
  },
  deleteProduct: async (productID) => {
    return await productModel.deleteProduct(productID);
  },
};
const test = {
  productID: 106,
  productName: "asdasd",
  ingredients: [
    { id: 10001, quantity: 2 },
    { id: 10002, quantity: 9 },
    { id: 10003, quantity: 1 },
  ],
  tags: ["HÄLFY"],
  price: 89,
  specialOffer: 5,
  description: "Steg 2, köp mat",
};
