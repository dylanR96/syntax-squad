import { AdminService } from "../services/adminService.js";
import { sendResponse } from "../utils/responseHelper.js";
import { tryCatchWrapper } from "../utils/tryCatchUtil.js";
import {
  createAdminSchema,
  editAdminSchema,
  loginAdminSchema,
} from "../validations/adminValidations.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { verifyUser } from "../utils/verifyUser.js";
import { authorizeAdmin } from "../middlewares/authMiddleware.js";
import { ADMIN_ROLE } from "../constants/userRole.js";

export const createAdmin = async (event) => {
  return tryCatchWrapper(async () => {
    const body = JSON.parse(event.body);
    const value = validateRequest(createAdminSchema, body);
    await AdminService.createAdmin(value);
    return sendResponse(200, "Admin created successfully");
  });
};

export const loginAdmin = async (event) => {
  return tryCatchWrapper(async () => {
    const body = JSON.parse(event.body);
    const value = validateRequest(loginAdminSchema, body);
    const data = await AdminService.loginAdmin(value);
    const token = verifyUser({ id: data.adminID }, ADMIN_ROLE);
    return sendResponse(200, { token });
  });
};

export const getAdmin = async (event) => {
  return tryCatchWrapper(async () => {
    const user = await authorizeAdmin(event);
    const data = await AdminService.getAdmin(user.id);
    return sendResponse(200, data);
  });
};

export const changeEmail = async (event) => {
  return tryCatchWrapper(async () => {
    const user = await authorizeAdmin(event);
    const body = JSON.parse(event.body);
    const value = validateRequest(editAdminSchema, body);
    const newEmail = await AdminService.changeEmail(value, user.id);
    return sendResponse(200, newEmail);
  });
};

export const deleteAdmin = async (event) => {
  return tryCatchWrapper(async () => {
    const user = await authorizeAdmin(event);
    await AdminService.deleteAdmin(user.id);
    return sendResponse(200, "Admin user successfully deleted");
  });
};
