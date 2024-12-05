import { CUSTOMERS_TABLE } from "../constants/tableNames.js";
import { customerModel } from "../models/customerModel.js";
import { scanTable } from "../utils/dbTableScan.js";
import { verifyPassword } from "../utils/passwordHasher.js";

export const CustomerService = {
  createCustomer: async (customerData) => {
    const existingUser = await scanTable(
      customerData.email,
      CUSTOMERS_TABLE,
      "email"
    );
    if (existingUser) {
      throw new Error("That email is taken. Try another.");
    }
    return await customerModel.createCustomer(customerData);
  },

  loginCustomer: async (customerData) => {
    const existingUser = await scanTable(
      customerData.email,
      CUSTOMERS_TABLE,
      "email"
    );
    if (!existingUser) {
      throw new Error("Incorrect email or password");
    }
    const isPasswordValid = await verifyPassword(
      customerData.password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Incorrect email or password");
    }
    return await customerModel.loginCustomer(customerData);
  },

  getCustomers: async () => {
    return await customerModel.getCustomers();
  },
  getCustomer: async (customerID) => {
    const existingUser = await scanTable(customerID, CUSTOMERS_TABLE, "customerID");
    if(!existingUser) {
      throw new Error("User does not exist.");
    }
    return await customerModel.getCustomer(customerID);
  },
  deleteCustomer: async (customerID) => {
    const existingUser = await scanTable(customerID, CUSTOMERS_TABLE, "customerID");
    if(!existingUser) {
      throw new Error("User does not exist.");
    }
    return await customerModel.deleteCustomer(customerID);
  },
  editCustomer: async (customerID) => {
    const existingUser = await scanTable(customerID, CUSTOMERS_TABLE, "customerID");
    if(!existingUser) {
      throw new Error("Login is incorrect");
    }
    return await customerModel.editCustomer(customerID);
  },
};