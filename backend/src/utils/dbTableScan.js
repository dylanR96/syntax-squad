import { db } from "../config/dynamoConfig.js";
import { tryCatchWrapper } from "./tryCatchUtil.js";

export const scanTable = async (value, table, valueField) => {
    return tryCatchWrapper(async () => {
        const params = {
            TableName: table,
            FilterExpression: `${valueField} = :value`,
            ExpressionAttributeValues: {
              ":value": value,
            },
          };
          const data = await db.scan(params);
         return data.Items && data.Items.length > 0 ? data.Items[0] : null;
    })
}
