import { orderModel } from "../models/ordersModel.js";

export const OrderService = {
    createOrder: async(orderData) => {
        return await orderModel.createOrder(orderData);
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
    getAllOrders: async(orderData) => {
        return await orderModel.getAllOrders(orderData);
    }
}