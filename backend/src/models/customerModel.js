import { db } from "../config/dynamoConfig.js";
import { nanoid } from "nanoid";

import { CUSTOMERS_TABLE } from '../constants/tableNames.js'

export const customerModel = {
  createCustomer: async (customerData) => {
    const params = {
      TableName: CUSTOMERS_TABLE,
      Item: {
        customerID: nanoid(),
        email: customerData.email,
        password: customerData.password,
        firstname: customerData.firstname,
        surname: customerData.surname,
        address: customerData.address,
        zipcode: customerData.zipcode,
        city: customerData.city,
        phoneNumber: customerData.phoneNumber,
        createdAt: new Date().toISOString(),
      },
    };
  
    const data = await db.put(params)
    console.log(data);
    return data;
  },
  getCustomers: async () => {
    const { Items } = await db.scan({TableName: CUSTOMERS_TABLE});
    return Items;
  },
  deleteCustomer: async () => {

  },
  editCustomer: async () => {

  }
}
