import { customerModel } from "../models/customerModel.js";

export const CustomerService = {
  createCustomer: async (customerData) => {
    //validering(middleware)
    return await customerModel.createCustomer(customerData);
  },
  getCustomers: async () => {
    return await customerModel.getCustomers();
  },
  getCustomer: async (customerID) => {
    return await customerModel.getCustomer(customerID);
  },
  deleteCustomer: async (customerID) => {
    return await customerModel.deleteCustomer(customerID);
  },
  editCustomer: async (customerData) => {
    return await customerModel.editCustomer(customerData);
  },
};
