import { ORDERS_TABLE } from "../constants/tableNames.js";
import { orderModel } from "../models/ordersModel.js";
import { queryTable } from "../utils/dbQueryTable.js";

export const OrderService = {
  createOrder: async (orderData, tokenID) => {
    return await orderModel.createOrder(orderData, tokenID);
  },
  changeOrder: async (orderData) => {
    const existingOrder = await scanTable(
      orderData.orderNO,
      ORDERS_TABLE,
      "orderNO"
    );
    if (!existingOrder) {
      throw new Error("There is no order with that order number.");
    }
    return await orderModel.changeOrder(orderData);
  },
  deleteOrder: async (orderData, userID) => {
    const orders = await queryTable(
      ORDERS_TABLE,
      "UserIDIndex",
      "userID",
      userID
    );
    if (!orders || orders.length === 0) {
      throw new Error("No orders found.");
    }

    const orderToDelete = orders.find(
      (order) => order.orderNO === orderData.orderNO
    );

    if (!orderToDelete) {
      throw new Error("Order not found for this customer.");
    }
    return await orderModel.deleteOrder({ orderID: orderToDelete.orderID });
  },
  changeOrderStatus: async (orderData) => {
    const existingOrder = await scanTable(
      orderData.orderNO,
      ORDERS_TABLE,
      "orderNO"
    );
    if (!existingOrder) {
      throw new Error("There is no order with that order number.");
    }
    return await orderModel.changeOrderStatus(orderData);
  },
  getOrder: async (orderData) => {
    const existingOrder = await scanTable(
      orderData.orderNO,
      ORDERS_TABLE,
      "orderNO"
    );
    if (!existingOrder) {
      throw new Error("There is no order with that order number.");
    }
    return await orderModel.getOrder(orderData);
  },
  getOrderByUserID: async (customerID) => {
    return await orderModel.getOrderByUserID(customerID);
  },
  getAllOrders: async () => {
    return await orderModel.getAllOrders();
  },
};
