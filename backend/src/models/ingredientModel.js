import { INGREDIENTS_TABLE } from "../constants/tableNames.js";
import { db } from "../config/dynamoConfig.js";
import { createID } from "../utils/dynamodbHelper.js";

export const ingredientModel = {
  addIngredient: async (ingredientData) => {
    // 5 SEK for every ingredient for now, scalable for the future
    const params = {
      TableName: INGREDIENTS_TABLE,
      Item: {
        ingredientID: await createID(INGREDIENTS_TABLE, "ingredientID", 10000),
        ingredientName: ingredientData.ingredientName,
        stock: ingredientData.stock,
        units: ingredientData.units,
        pricePerUnit: 5,
      },
    };
    const data = await db.put(params);
    return data;
  },
  getAllIngredients: async () => {
    const { Items } = await db.scan({ TableName: INGREDIENTS_TABLE });
    return Items;
  },
  deleteIngredient: async (ingredientData) => {
    const params = {
      TableName: INGREDIENTS_TABLE,
      Key: {
        ingredientID: ingredientData.ingredientID,
      },
    };
    const data = await db.delete(params);
    return data;
  },
  getIngredientsByIds: async (ingredientIDs) => {
    const params = {
      RequestItems: {
        [INGREDIENTS_TABLE]: {
          Keys: ingredientIDs,
        },
      },
    };
    const data = await db.batchGet(params);
    return data.Responses[INGREDIENTS_TABLE];
  },
  editIngredient: async (ingredientData) => {
    const params = {
      TableName: INGREDIENTS_TABLE,
      Key: {
        ingredientID: ingredientData.ingredientID,
      },
      UpdateExpression: `SET 
        ingredientName = :ingredientName, 
        stock = :stock, 
        units = :units,
        pricePerUnit = :pricePerUnit`,

      ExpressionAttributeValues: {
        ":ingredientName": ingredientData.ingredientName,
        ":stock": ingredientData.stock,
        ":units": ingredientData.units,

        ":pricePerUnit": ingredientData.pricePerUnit
          ? ingredientData.pricePerUnit
          : 0,
      },
      ReturnValues: "ALL_NEW",
    };
    const data = db.update(params);
    return data;
  },
  changeStock: async (ingredientID, value, plusMinus) => {
    let updateExpression = "SET stock = stock - :decrement";
    if (plusMinus === "add") {
      updateExpression = "SET stock = stock + :decrement";
    }
    const params = {
      TableName: INGREDIENTS_TABLE, // Replace with your table name
      Key: { ingredientID: ingredientID }, // The primary key of the item to update
      UpdateExpression: updateExpression, // Decrement the stock
      ConditionExpression: "stock >= :decrement", // Ensure stock does not go below zero
      ExpressionAttributeValues: {
        ":decrement": value, // The amount to decrement
      },
      ReturnValues: "UPDATED_NEW", // Return the updated values
    };
    const data = db.update(params);
    return data;
  },
};
