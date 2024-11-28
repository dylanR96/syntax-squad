import { AdminService } from "../services/adminService.js";
import { sendResponse } from "../utils/responseHelper.js";
import { tryCatchWrapper } from "../utils/tryCatchUtil.js";
import { createAdminSchema, deleteAdminSchema, editAdminSchema, getAdminSchema } from "../validations/adminValidations.js";
import { validateRequest } from "../validations/validateRequest.js";

export const createAdmin = async (event) => {
  return tryCatchWrapper(async () => {
    const body = JSON.parse(event.body);
    const value = validateRequest(createAdminSchema, body)
    await AdminService.createAdmin(value);
    return sendResponse(200, "Admin created successfully");
  })
    
};

export const getAdmin = async (event) => {
  return tryCatchWrapper(async () => {
    const { adminID } = event.pathParameters;
    const value = validateRequest(getAdminSchema, {adminID})
    const data = await AdminService.getAdmin(value.adminID);
    return sendResponse(200, data);
  })
  
};

export const changeEmail = async (event) => {
  return tryCatchWrapper(async () => {
    const body = JSON.parse(event.body);
    const value = validateRequest(editAdminSchema, body)
    const newEmail = await AdminService.changeEmail(value);
    return sendResponse(200, newEmail);
  })
};

export const deleteAdmin = async (event) => {
  return tryCatchWrapper(async () => {
    const { adminID } = event.pathParameters;
    const value = validateRequest(deleteAdminSchema, {adminID})
    await AdminService.deleteAdmin(value.adminID);
    return sendResponse(200, "Admin user successfully deleted");
  })
};
