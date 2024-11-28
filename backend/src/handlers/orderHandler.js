import { orderService } from "../services/orderService.js";
import { sendResponse, sendError } from "../utils/responseHelper.js";

export const createOrder = async(event) => {
try {
    const body = JSON.parse(event.body);
    await orderService.createOrder(body);
    return sendResponse(200, "Order created successfully");
} catch (error) {
    return sendError(error.statuscode || 500, error.message)
}
}

export const changeOrder = async(event) => {
    try {
        const body = JSON.parse(event.body);
        await orderService.changeOrder(body);
        return sendResponse(200, "Order changed successfully");
    } catch (error) {
        return sendError(error.statuscode || 500, error.message)
    }
}

export const deleteOrder = async(event) => {
    try {
        const body = JSON.parse(event.body);
        await orderService.deleteOrder(body);
        return sendResponse(200, "Order deleted successfully")
    } catch (error) {
        return sendError(error.statuscode || 500, error.message)
    }
}

export const changeOrderStatus = async(event) => {
    try {
        const body = JSON.parse(event.body);
        await orderService.changeOrderStatus(body)
        return sendResponse(200, "Order status updated successfully")
    } catch (error) {
        return sendError(error.statuscode || 500, error.message)
    }
}