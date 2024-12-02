import { OrderService } from "../services/orderService.js";
import { sendResponse } from "../utils/responseHelper.js";
import { tryCatchWrapper } from "../utils/tryCatchUtil.js";
import { validateRequest } from "../validations/validateRequest.js";
import {
  createOrderSchema,
  changeOrderSchema,
  deleteOrderSchema,
  changeStatusSchema,
  getOrderSchema,
} from "../validations/orderValidations.js";

export const createOrder = async (event) => {
  return tryCatchWrapper(async () => {
    const body = JSON.parse(event.body);
    const value = validateRequest(createOrderSchema, body);
    await OrderService.createOrder(value);
    return sendResponse(200, "Order created successfully");
  });
};

export const changeOrder = async (event) => {
  return tryCatchWrapper(async () => {
    const body = JSON.parse(event.body);
    const value = validateRequest(changeOrderSchema, body);
    await OrderService.changeOrder(value);
    return sendResponse(200, "Order changed successfully");
  });
};

export const deleteOrder = async (event) => {
  return tryCatchWrapper(async () => {
    const { orderNO } = event.pathParameters;
    const value = validateRequest(deleteOrderSchema, { orderNO });
    await OrderService.deleteOrder(parseInt(value.orderNO));
    return sendResponse(200, "Order deleted successfully");
  });
};

export const changeOrderStatus = async (event) => {
  return tryCatchWrapper(async () => {
    const body = JSON.parse(event.body);
    const value = validateRequest(changeStatusSchema, body);
    await OrderService.changeOrderStatus(value);
    return sendResponse(200, "Order status updated successfully");
  });
};

export const getOrder = async (event) => {
  return tryCatchWrapper(async () => {
    const { orderNO } = event.pathParameters;
    const value = validateRequest(getOrderSchema, { orderNO });
    const data = await OrderService.getOrder(parseInt(value.orderNO));
    return sendResponse(200, data);
  });
};

export const getAllOrders = async () => {
  return tryCatchWrapper(async () => {
    const data = await OrderService.getAllOrders();
    return sendResponse(200, data);
  });
};
