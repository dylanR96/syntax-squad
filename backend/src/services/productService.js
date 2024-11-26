import { productModel } from "../models/productModel.js";

export const ProductService = {
  createProduct: async (productData) => {
    //validering(middleware)
    return await productModel.createProduct(productData);
  },
  getAllProducts: async () => {
    return await productModel.getAllProducts();
  },
  // getAdmin: async (data) => {
  //     //validering(middleware)
  //     return await adminModel.getAdmin(data);
  //   }
};
