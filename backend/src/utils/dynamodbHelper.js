import { db } from "../config/dynamoConfig.js";
export const createID = async (TABLE_NAME, ID_KEY, START_NUMBER) => {
  const { Items } = await db.scan({ TableName: TABLE_NAME });
  const ids = Items.map((item) => item[ID_KEY]);
  const maxId = ids.length > 0 ? Math.max(...ids) : START_NUMBER;
  console.log(maxId + 1);
  return maxId + 1;
};
