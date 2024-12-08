import { productModel } from "../models/productModel.js";

export const ProductService = {
  createProduct: async (productData) => {
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
