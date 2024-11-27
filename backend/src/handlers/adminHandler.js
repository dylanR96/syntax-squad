import { AdminService } from "../services/adminService.js";
import { sendError, sendResponse } from "../utils/responseHelper.js";

export const createAdmin = async (event) => {
  try {
    const body = JSON.parse(event.body);
    await AdminService.createAdmin(body);
    return sendResponse(200, "Admin created successfully");
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};

export const getAdmin = async (event) => {
  try {
    const { adminID } = event.pathParameters;
    const { Item: data } = await AdminService.getAdmin(adminID);
    return sendResponse(200, data);
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};

export const changeEmail = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const newEmail = await AdminService.changeEmail(body);
    return sendResponse(200, newEmail);
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};

export const deleteAdmin = async (event) => {
  try {
    const { adminID } = event.pathParameters;
    await AdminService.deleteAdmin(adminID);
    return sendResponse(200, "Admin user successfully deleted");
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};
