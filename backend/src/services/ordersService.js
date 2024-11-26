import { orderModel } from "../models/ordersModel";

export const orderService = {
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
    }
}