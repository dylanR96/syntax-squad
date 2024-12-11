import { db } from "../config/dynamoConfig.js";
import { tryCatchWrapper } from "./tryCatchUtil.js";

export const queryTable = async (table, indexName, keyName, keyValue) => {
  return tryCatchWrapper(async () => {
    const params = {
      TableName: table,
      IndexName: indexName,
      KeyConditionExpression: `${keyName} = :keyValue`,
      ExpressionAttributeValues: {
        ":keyValue": keyValue,
      },
    };
    const data = await db.query(params);
    return data.Items;
  });
};

