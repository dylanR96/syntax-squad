import { ProductService } from "../services/productService.js";
import { sendResponse } from "../utils/responseHelper.js";
import { tryCatchWrapper } from "../utils/tryCatchUtil.js";
import { validateRequest } from "../validations/validateRequest.js";
import {
  createProductSchema,
  deleteProductSchema,
  editProductSchema,
  getProductSchema,
} from "../validations/productValidations.js";

export const createProduct = async (event) => {
  return tryCatchWrapper(async () => {
    const body = JSON.parse(event.body);
    const value = validateRequest(createProductSchema, body);
    await ProductService.createProduct(value);
    return sendResponse(200, "Product successfully created");
  });
};

export const getAllProducts = async () => {
  return tryCatchWrapper(async () => {
    const getAllProducts = await ProductService.getAllProducts();
    return sendResponse(200, getAllProducts);
  });
};

export const getProduct = async (event) => {
  return tryCatchWrapper(async () => {
    const { productID } = event.pathParameters;
    const value = validateRequest(getProductSchema, { productID });
    const data = await ProductService.getProduct(parseInt(value.productID));
    return sendResponse(data, 200);
  });
};

export const editProduct = async (event) => {
  return tryCatchWrapper(async () => {
    const body = JSON.parse(event.body);
    const value = validateRequest(editProductSchema, body);
    await ProductService.editProduct(value);
    return sendResponse(200, "Product successfully changed");
  });
};

export const deleteProduct = async (event) => {
  return tryCatchWrapper(async () => {
    const { productID } = event.pathParameters;
    const value = validateRequest(deleteProductSchema, { productID });
    await ProductService.deleteProduct(parseInt(value.productID));
    return sendResponse(200, "Product successfully deleted");
  });
};
