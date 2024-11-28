import { ProductService } from "../services/productService.js";
import { sendError, sendResponse } from "../utils/responseHelper.js";
import { createProductSchema, deleteProductSchema, editProductSchema, getProductSchema } from "../validations/productValidations.js";

export const createProduct = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { error, value } = createProductSchema.validate(body);
    if (error) {
      return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
    }
    await ProductService.createProduct(value);
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
    const { error, value } = getProductSchema.validate(productID);
    if (error) {
      return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
    }
    await ProductService.createProduct(value);
    const data = await ProductService.getProduct(parseInt(value));
    console.log(data);
    return sendResponse(200, data);
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};

export const editProduct = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { error, value } = editProductSchema.validate(body);
    if (error) {
      return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
    }
    await ProductService.editProduct(value);
    return sendResponse(200, "Product successfully changed");
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};

export const deleteProduct = async (event) => {
  try {
    const { productID } = event.pathParameters;
    const { error, value } = deleteProductSchema.validate(productID);
    if (error) {
      return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
    }
    await ProductService.deleteProduct(parseInt(value));
    return sendResponse(200, "Product successfully deleted");
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};
