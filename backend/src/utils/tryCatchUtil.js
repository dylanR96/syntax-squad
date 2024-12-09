import { sendError } from "./responseHelper.js";

export const tryCatchWrapper = async (handler) => {
  try {
    return await handler();
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return sendError(statusCode, message);
  }
};
