import { orderService } from "../services/orderService.js";
import { sendResponse, sendError } from "../utils/responseHelper.js";

export const createOrder = async(event) => {
try {
    const body = JSON.parse(event.body);
    const { error, value } = createOrderSchema.validate(body);
    if (error) {
      return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
    }
    await orderService.createOrder(value);
    return sendResponse(200, "Order created successfully");
} catch (error) {
    return sendError(error.statuscode || 500, error.message)
}
}

export const changeOrder = async(event) => {
    try {
        const body = JSON.parse(event.body);
        const { error, value } = changeOrderSchema.validate(body);
        if (error) {
          return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
        }
        await orderService.changeOrder(value);
        return sendResponse(200, "Order changed successfully");
    } catch (error) {
        return sendError(error.statuscode || 500, error.message)
    }
}

export const deleteOrder = async(event) => {
    try {
        const body = JSON.parse(event.body);
        const { error, value } = deleteOrderSchema.validate(body);
        if (error) {
          return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
        }
        await orderService.deleteOrder(value);
        return sendResponse(200, "Order deleted successfully")
    } catch (error) {
        return sendError(error.statuscode || 500, error.message)
    }
}

export const changeOrderStatus = async(event) => {
    try {
        const body = JSON.parse(event.body);
        const { error, value } = changeOrderSchema.validate(body);
        if (error) {
          return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
        }
        await orderService.changeOrderStatus(value);
        return sendResponse(200, "Order status updated successfully")
    } catch (error) {
        return sendError(error.statuscode || 500, error.message)
    }
}