import { CustomerService } from "../services/customerService.js";
import { sendError, sendResponse } from "../utils/responseHelper.js";
import { tryCatchWrapper } from "../utils/tryCatchUtil.js";
import { createCustomerSchema, deleteCustomerSchema, editCustomerSchema, getCustomerSchema } from "../validations/customerValidations.js";

export const createCustomer = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { error, value } = createCustomerSchema.validate(body);
    if (error) {
      return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
    }
   await CustomerService.createCustomer(value);
    return sendResponse(200, "Customer created successfully");
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};

export const getCustomers = async () => {
  tryCatchWrapper(async () => {
    const getCustomers = await CustomerService.getCustomers();
    return sendResponse(200, getCustomers);
  })
};

export const getCustomer = async (event) => {
  tryCatchWrapper(async () => {
  const { customerID } = event.pathParameters;
  const value = validateRequest(changeStatusSchema, {customerID})
  const customer = await CustomerService.getCustomer(value.customerID);
  return sendResponse(200, customer); 
})
};

export const editCustomer = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { error, value } = editCustomerSchema.validate(body);
    if (error) {
      return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
    }
    const editCustomer = await CustomerService.editCustomer(value);
    return sendResponse(200, editCustomer);
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};

export const deleteCustomer = async (event) => {
  try {
    const { customerID } = event.pathParameters;
    const { error, value } = deleteCustomerSchema.validate(customerID);
    if (error) {
      return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
    }
    await CustomerService.deleteCustomer(value);
    return sendResponse(200, "Customer successfully deleted");
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};
