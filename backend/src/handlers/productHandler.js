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

export const getProduct = async (event) => {
  try {
    const { productID } = event.pathParameters;
    const data = await ProductService.getProduct(parseInt(productID));
    console.log(data);
    return sendResponse(200, data);
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};

export const editProduct = async (event) => {
  try {
    const body = JSON.parse(event.body);
    await ProductService.editProduct(body);
    return sendResponse(200, "Product successfully changed");
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};

export const deleteProduct = async (event) => {
  try {
    const { productID } = event.pathParameters;
    await ProductService.deleteProduct(parseInt(productID));
    return sendResponse(200, "Product successfully deleted");
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};
