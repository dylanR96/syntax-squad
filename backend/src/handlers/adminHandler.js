import { AdminService } from "../services/adminService.js";
import { sendError, sendResponse } from "../utils/responseHelper.js";
import { createAdminSchema, editAdminSchema, getAdminSchema } from "../validations/adminValidations.js";

export const createAdmin = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { error, value } = createAdminSchema.validate(body);
    if (error) {
      return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
    }
    await AdminService.createAdmin(value);
    return sendResponse(200, "Admin created successfully");
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};

export const getAdmin = async (event) => {
  try {
    const { adminID } = event.pathParameters;
    const { error, value } = getAdminSchema.validate(adminID);
    if (error) {
      return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
    }
    const { Item: data } = await AdminService.getAdmin(value);
    return sendResponse(200, data);
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};

export const changeEmail = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { error, value } = editAdminSchema.validate(body);
    if (error) {
      return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
    }
    const newEmail = await AdminService.changeEmail(value);
    return sendResponse(200, newEmail);
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};

export const deleteAdmin = async (event) => {
  try {
    const { adminID } = event.pathParameters;
    const { error, value } = editAdminSchema.validate(adminID);
    if (error) {
      return sendError(error.statuscode, `Validation Error: ${error.details[0].message}`);
    }
    await AdminService.deleteAdmin(value);
    return sendResponse(200, "Admin user successfully deleted");
  } catch (error) {
    return sendError(error.statusCode || 500, error.message);
  }
};
