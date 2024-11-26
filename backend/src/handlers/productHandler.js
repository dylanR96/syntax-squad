import { ProductService } from "../services/productService.js";
import { sendError, sendResponse } from "../utils/responseHelper.js";

export const createProduct = async (event) => {
  try {
    const body = JSON.parse(event.body);
    await ProductService.createProduct(body);
    return sendResponse(200, "Product successfully created");
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};

export const getAllProducts = async () => {
  try {
    const getAllProducts = await ProductService.getAllProducts();
    console.log(getAllProducts);
    return sendResponse(200, getAllProducts);
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};
