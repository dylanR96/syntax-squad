import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDB({
  region: process.env.AWS_REGION,
});

const db = DynamoDBDocument.from(client);

export { db };

// const params = {
//   TableName: "Admins",
//   Item: {
//     adminID: "125125",
//   },
// };
// try {
//   const test = await db.put(params);
//   console.log(test);
// } catch (error) {
//   console.log(error)
// }