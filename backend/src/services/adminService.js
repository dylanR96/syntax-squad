import { adminModel } from "../models/adminModel.js";

export const AdminService = {
  createAdmin: async (userData) => {
    //validering(middleware)
    return await adminModel.createAdmin(userData);
  },

  getAdmin: async (data) => {
    //validering(middleware)
    return await adminModel.getAdmin(data);
  },

  deleteAdmin: async (data) => {
    return await adminModel.deleteAdmin(data);
  },

  changeEmail: async (data) => {
    return await adminModel.changeEmail(data);
  },
};
