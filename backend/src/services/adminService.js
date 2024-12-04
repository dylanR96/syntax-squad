import { adminModel } from "../models/adminModel.js";
import { ADMIN_TABLE } from "../constants/tableNames.js";
import { scanTable } from "../utils/dbTableScan.js";
import { verifyPassword } from "../utils/passwordHasher.js";

export const AdminService = {
  createAdmin: async (adminData) => {
    const existingAdmin = await scanTable(
      adminData.email,
      ADMIN_TABLE,
      "email"
    );
    if (existingAdmin) {
      throw new Error("User exists");
    }
    return await adminModel.createAdmin(adminData);
  },

  loginAdmin: async (adminData) => {
    const admin = await scanTable(adminData.email, ADMIN_TABLE, "email");
    if (!admin) {
      throw new Error("Incorrect email or password");
    }

    const isPasswordValid = await verifyPassword(
      adminData.password,
      admin.password
    );
    if (!isPasswordValid) {
      throw new Error("Incorrect email or password");
    }
    return await adminModel.loginAdmin(adminData);
  },

  getAdmin: async (adminID) => {
     const existingAdmin = await scanTable(adminID, ADMIN_TABLE, "adminID");
     if (!existingAdmin) {
      throw new Error("Admin not found.");
    }
    return await adminModel.getAdmin(adminID);
  },

  deleteAdmin: async (adminID) => {
    const admin = await scanTable(adminID, ADMIN_TABLE, "adminID");
    if(!admin) {
      throw new Error("Login is incorrect")
    }
    return await adminModel.changeEmail(adminID);
  },

  changeEmail: async (adminData, adminID) => {
    const admin = await scanTable(adminID, ADMIN_TABLE, "adminID");
    if(!admin) {
      throw new Error("Login is incorrect")
    }
    return await adminModel.changeEmail(adminData, adminID);
  },
};
