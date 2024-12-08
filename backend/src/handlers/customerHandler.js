import { CustomerService } from "../services/customerService.js";
import { sendResponse } from "../utils/responseHelper.js";
import { tryCatchWrapper } from "../utils/tryCatchUtil.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  createCustomerSchema,
  editCustomerSchema,
  customerLoginSchema,
} from "../validations/customerValidations.js";
import { verifyUser } from "../utils/verifyUser.js";
import { authorizeAdmin, authorizeCustomer } from "../middlewares/authMiddleware.js";
import { CUSTOMER_ROLE } from "../constants/userRole.js";

export const createCustomer = async (event) => {
  return tryCatchWrapper(async () => {
    const body = JSON.parse(event.body);
    const value = validateRequest(createCustomerSchema, body);
      await CustomerService.createCustomer(value);
      return sendResponse(200, "Customer created successfully");
  });
};

export const loginCustomer = async (event) => {
  return tryCatchWrapper(async () => {
    const body = JSON.parse(event.body);
    const value = validateRequest(customerLoginSchema, body);
    const data = await CustomerService.loginCustomer(value);
    const token = verifyUser({ id: data.customerID }, CUSTOMER_ROLE);
    return sendResponse(200, { token });
  });
};

export const getCustomers = async (event) => {
  return tryCatchWrapper(async () => {
    await authorizeAdmin(event);
    const getCustomers = await CustomerService.getCustomers();
    return sendResponse(200, getCustomers);
  });
};

export const getCustomer = async (event) => {
  return tryCatchWrapper(async () => {
    const user = await authorizeCustomer(event);
    const customer = await CustomerService.getCustomer(user.id);
    return sendResponse(200, customer);
  });
};

export const editCustomer = async (event) => {
  return tryCatchWrapper(async () => {
    const user = await authorizeCustomer(event);
    const body = JSON.parse(event.body);
    const value = validateRequest(editCustomerSchema, body);
    const editCustomer = await CustomerService.editCustomer(value, user.id);
    return sendResponse(200, editCustomer);
  });
};

export const deleteCustomer = async (event) => {
  return tryCatchWrapper(async () => {
    await authorizeAdmin(event);
    const { customerID } = event.pathParameters;
    const value = validateRequest({ customerID });
    await CustomerService.deleteCustomer(value.customerID);
    return sendResponse(200, "Customer successfully deleted");
  });
};
