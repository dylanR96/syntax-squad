import { CustomerService } from "../services/customerService.js";
import { sendError, sendResponse } from "../utils/responseHelper.js";

export const createCustomer = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const createdCustomer = await CustomerService.createCustomer(body);
    return sendResponse(200, "Customer created successfully");
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};

export const getCustomers = async () => {
  try {
    const getCustomers = await CustomerService.getCustomers();
    return sendResponse(200, getCustomers);
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};

export const getCustomer = async (event) => {
  try {
    const { customerID } = event.pathParameters;
    const customer = await CustomerService.getCustomer(customerID);
    return sendResponse(200, customer);
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};

export const editCustomer = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const editCustomer = await CustomerService.editCustomer(body);
    return sendResponse(200, editCustomer);
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};

export const deleteCustomer = async (event) => {
  try {
    const { customerID } = event.pathParameters;
    await CustomerService.deleteCustomer(customerID);
    return sendResponse(200, "Customer successfully deleted");
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};
