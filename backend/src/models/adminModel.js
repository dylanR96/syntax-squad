import { ADMIN_TABLE } from "../constants/tableNames.js";
import { nanoid } from "nanoid";
import { db } from "../config/dynamoConfig.js";
import { passwordHasher } from "../utils/passwordHasher.js";

export const adminModel = {
  createAdmin: async (adminData) => {
    const hashedPassword = await passwordHasher(adminData);
    const params = {
      TableName: ADMIN_TABLE,
      Item: {
        adminID: nanoid(),
        email: adminData.email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      },
    };

    const data = await db.put(params);
    return data;
  },

  loginAdmin: async (adminData) => {
    const params = {
      TableName: ADMIN_TABLE,
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": adminData.email,
      },
    };

    const data = await db.scan(params);
    return data.Items[0];
  },

  getAdmin: async (adminID) => {
    const params = {
      TableName: ADMIN_TABLE,
      Key: { adminID },
    };
    const { Item: data } = await db.get(params);
    return data;
  },

  changeEmail: async (adminData, adminID) => {
    const params = {
      TableName: ADMIN_TABLE,
      Key: {
        adminID: adminID,
      },
      UpdateExpression: `SET 
        email = :email`,
      ExpressionAttributeValues: {
        ":email": adminData.email,
      },
      ReturnValues: "ALL_NEW",
    };
    const data = db.update(params);
    return data.Attributes.email;
  },

  deleteAdmin: async (adminID) => {
    const params = {
      TableName: ADMIN_TABLE,
      Key: { adminID },
    };
    const data = await db.delete(params);
    return data;
  },
};
