import { INGREDIENTS_TABLE } from "../constants/tableNames.js";
import { db } from "../config/dynamoConfig.js";
import { createID } from "../utils/dynamodbHelper.js";

export const ingredientModel = {
  addIngredient: async (ingredientData) => {
    const params = {
      TableName: INGREDIENTS_TABLE,
      Item: {
        ingredientID: await createID(INGREDIENTS_TABLE, "ingredientID", 10000),
        ingredientName: ingredientData.name,
        stock: ingredientData.stock,
        units: ingredientData.units,
        pricePerUnit: ingredientData.pricePerUnit,
        exchangeFor: ingredientData.exchangeFor,
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
        ingredientName = :name, 
        stock = :stock, 
        units = :units,
        priceForExtra = :priceForExtra, 
        exchangeFor = :exchangeFor`,
      ExpressionAttributeValues: {
        ":name": ingredientData.name,
        ":stock": ingredientData.stock,
        ":units": ingredientData.units,
        ":priceForExtra": ingredientData.priceForExtra,
        ":exchangeFor": ingredientData.exchangeFor,
      },
      ReturnValues: "ALL_NEW",
    };
    const data = db.update(params);
    return data;
  },
};
