import { CustomerService } from "../services/customerService.js";
import { sendResponse } from "../utils/responseHelper.js";
import { tryCatchWrapper } from "../utils/tryCatchUtil.js";
import { validateRequest } from "../validations/validateRequest.js";
import {
  createCustomerSchema,
  deleteCustomerSchema,
  editCustomerSchema,
  getCustomerSchema,
  customerLoginSchema,
} from "../validations/customerValidations.js";

export const createCustomer = async (event) => {
  return tryCatchWrapper(async () => {
    const body = JSON.parse(event.body);
    const value = validateRequest(createCustomerSchema, body);
    const result = await scanTable(value.email, CUSTOMERS_TABLE, "email");
    if (result) {
      return sendError(404, "User exists");
    } else {
      await CustomerService.createCustomer(value);
      sendResponse(200, "Customer created successfully");
    }
  });
};

export const loginCustomer = async (event) => {
  return tryCatchWrapper(async () => {
    const body = JSON.parse(event.body);
    const value = validateRequest(customerLoginSchema, body);
    const result = await scanTable(value.email, CUSTOMERS_TABLE, "email");
    if (!result) {
      return sendError(404, "User does not exist");
    } else {
      const isPasswordValid = await verifyPassword(
        value.password,
        result.password
      );
      if (!isPasswordValid) {
        return sendError(401, "Wrong username or password");
      } else {
        const data = await CustomerService.loginCustomer(value);
        const token = validateUser({ id: data.customerID });
        return sendResponse(200, { token });
      }
    }
  });
};

export const getCustomers = async () => {
  return tryCatchWrapper(async () => {
    const getCustomers = await CustomerService.getCustomers();
    return sendResponse(200, getCustomers);
  });
};

export const getCustomer = async (event) => {
  return tryCatchWrapper(async () => {
    const { customerID } = event.pathParameters;
    const value = validateRequest(getCustomerSchema, { customerID });
    const customer = await CustomerService.getCustomer(value.customerID);
    return sendResponse(200, customer);
  });
};

export const editCustomer = async (event) => {
  return tryCatchWrapper(async () => {
    const body = JSON.parse(event.body);
    const value = validateRequest(editCustomerSchema, body);
    const editCustomer = await CustomerService.editCustomer(value);
    return sendResponse(200, editCustomer);
  });
};

export const deleteCustomer = async (event) => {
  return tryCatchWrapper(async () => {
    const { customerID } = event.pathParameters;
    const value = validateRequest(deleteCustomerSchema, { customerID });
    await CustomerService.deleteCustomer(value.customerID);
    return sendResponse(200, "Customer successfully deleted");
  });
};
