import { ADMIN_TABLE } from "../constants/tableNames.js";
import { AdminService } from "../services/adminService.js";
import { sendError, sendResponse } from "../utils/responseHelper.js";
import { tryCatchWrapper } from "../utils/tryCatchUtil.js";
import {
  createAdminSchema,
  deleteAdminSchema,
  editAdminSchema,
  getAdminSchema,
  loginAdminSchema,
} from "../validations/adminValidations.js";
import { validateRequest } from "../validations/validateRequest.js";
import { scanTable } from "../utils/dbTableScan.js";
import { verifyPassword } from "../utils/passwordHasher.js";
import { validateUser } from "../validations/verifyUser.js";

export const createAdmin = async (event) => {
  return tryCatchWrapper(async () => {
    const body = JSON.parse(event.body);
    const value = validateRequest(createAdminSchema, body);
    const result = await scanTable(value.email, ADMIN_TABLE, "email");
    if (result) {
      return sendError(404, "User exists");
    } else {
      await AdminService.createAdmin(value);
      return sendResponse(200, "Admin created successfully");
    }
  });
};

export const loginAdmin = async (event) => {
  return tryCatchWrapper(async () => {
    const body = JSON.parse(event.body);
    const value = validateRequest(loginAdminSchema, body);
    const result = await scanTable(value.email, ADMIN_TABLE, "email");
    if (!result) {
      return sendError(404, "User does not exist");
    } else {
      const isPasswordValid = await verifyPassword(
        value.password,
        result.password
      );
      if (!isPasswordValid) {
        return sendError(401, "Wrong username or password");
      } else {
        const data = await AdminService.loginAdmin(value);
        const token = validateUser({id: data.adminID}, "admin" );
        return sendResponse(200, { token });
      }
    }
  });
};

export const getAdmin = async (event) => {
  return tryCatchWrapper(async () => {
    const { adminID } = event.pathParameters;
    const value = validateRequest(getAdminSchema, { adminID });
    const data = await AdminService.getAdmin(value.adminID);
    return sendResponse(200, data);
  });
};

export const changeEmail = async (event) => {
  return tryCatchWrapper(async () => {
    const body = JSON.parse(event.body);
    const value = validateRequest(editAdminSchema, body);
    const newEmail = await AdminService.changeEmail(value);
    return sendResponse(200, newEmail);
  });
};

export const deleteAdmin = async (event) => {
  return tryCatchWrapper(async () => {
    const { adminID } = event.pathParameters;
    const value = validateRequest(deleteAdminSchema, { adminID });
    await AdminService.deleteAdmin(value.adminID);
    return sendResponse(200, "Admin user successfully deleted");
  });
};
