import { db } from "../config/dynamoConfig.js";
import { nanoid } from "nanoid";
import { CUSTOMERS_TABLE } from "../constants/tableNames.js";

export const customerModel = {
  createCustomer: async (customerData) => {
    const hashedPassword = await passwordHasher(customerData);
    const params = {
      TableName: CUSTOMERS_TABLE,
      Item: {
        customerID: nanoid(),
        email: customerData.email,
        password: hashedPassword,
        firstname: customerData.firstname,
        surname: customerData.surname,
        address: customerData.address,
        zipcode: customerData.zipcode,
        city: customerData.city,
        phoneNumber: customerData.phoneNumber,
        createdAt: new Date().toISOString(),
      },
    };

    const data = await db.put(params);
    console.log(data);
    return data;
  },

  loginCustomer: async (customerData) => {
    const params = {
      TableName: CUSTOMERS_TABLE,
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": customerData.email,
      },
    };

    const data = await db.scan(params);
    return data.Items[0];
  },

  getCustomers: async () => {
    const { Items } = await db.scan({ TableName: CUSTOMERS_TABLE });
    return Items;
  },

  getCustomer: async (customerID) => {
    const params = {
      TableName: CUSTOMERS_TABLE,
      Key: { customerID },
    };
    const { Item: data } = await db.get(params);
    return data;
  },

  deleteCustomer: async (customerID) => {
    const params = {
      TableName: CUSTOMERS_TABLE,
      Key: { customerID },
    };
    const data = await db.delete(params);
    return data;
  },
  editCustomer: async (customerData) => {
    const params = {
      TableName: CUSTOMERS_TABLE,
      Key: {
        customerID: customerData.customerID,
      },
      UpdateExpression: `SET 
      email = :email, 
      firstname = :firstname, 
      surname = :surname,
      address = :address, 
      zipcode = :zipcode,
      city = :city,
      phoneNumber = :phoneNumber`,
      ExpressionAttributeValues: {
        ":email": customerData.email,
        ":firstname": customerData.firstname,
        ":surname": customerData.surname,
        ":address": customerData.address,
        ":zipcode": customerData.zipcode,
        ":city": customerData.city,
        ":phoneNumber": customerData.phoneNumber,
      },
      ReturnValues: "ALL_NEW", // Return the updated item
    };
    const data = db.update(params);
    return data;
  },
};
