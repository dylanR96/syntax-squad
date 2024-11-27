import { ADMIN_TABLE } from "../constants/tableNames.js";
import { nanoid } from "nanoid";
import { db } from "../config/dynamoConfig.js";

export const adminModel = {
  createAdmin: async (adminData) => {
    const params = {
      TableName: ADMIN_TABLE,
      Item: {
        adminID: nanoid(),
        email: adminData.email,
        password: adminData.password,
        createdAt: new Date().toISOString(),
      },
    };
  
    const data = await db.put(params)
    return data;
  },
  getAdmin: async (adminID) => {
    const params = {
        TableName: ADMIN_TABLE,
        Key: {adminID}
      };
      const data = await db.get(params)
      return data;
  },
  deleteAdmin: async () => {

  }
}