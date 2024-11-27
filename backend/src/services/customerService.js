import { customerModel } from "../models/customerModel.js";

export const CustomerService = {
    createCustomer: async (userData) => {
      //validering(middleware)
      return await customerModel.createCustomer(userData);
    },
    getCustomers: async () => {
      return await customerModel.getCustomers();
    }
    // getAdmin: async (data) => {
    //     //validering(middleware)
    //     return await adminModel.getAdmin(data);
    //   }
}