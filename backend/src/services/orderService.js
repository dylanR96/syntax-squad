import { orderModel } from "../models/ordersModel.js";

export const OrderService = {
    createOrder: async(orderData, tokenID) => {
        return await orderModel.createOrder(orderData, tokenID);
    },
    changeOrder: async(orderData) => {
        return await orderModel.changeOrder(orderData);
    },
    deleteOrder: async(orderData) => {
        return await orderModel.deleteOrder(orderData);
    },
    changeOrderStatus: async(orderData) => {
        return await orderModel.changeOrderStatus(orderData);
    },
    getOrder: async(orderData) => {
        return await orderModel.getOrder(orderData);
    },
    getOrderByUserID: async(customerID) => {
        return await orderModel.getOrderByUserID(customerID);
    },
    getAllOrders: async() => {
        return await orderModel.getAllOrders();
    }
}