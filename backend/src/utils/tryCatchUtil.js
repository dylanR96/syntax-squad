import { sendError } from "./responseHelper.js";

export const tryCatchWrapper = async (handler) => {
    try {
      return await handler();
    } catch (error) {
      return sendError(error.statusCode, error.message);
    }
  };