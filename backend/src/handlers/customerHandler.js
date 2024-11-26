import { CustomerService } from "../services/customerService.js";
import { sendError, sendResponse } from "../utils/responseHelper.js";


export const createCustomer = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const createdCustomer = await CustomerService.createCustomer(body);
    return sendResponse(200, "Customer created successfully");
  }
  catch (error) {
    return sendError(error.statusCode || 500, error.message)
  }
}

export const getCustomers = async () => {
  try {
    const getCustomers = await CustomerService.getCustomers();
    return sendResponse(200, getCustomers);
  }
  catch (error) {
    return sendError(error.statusCode || 500, error.message)
  }
}