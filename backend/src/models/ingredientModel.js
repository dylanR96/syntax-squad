import { INGREDIENTS_TABLE } from "../constants/tableNames.js";
import { db } from "../config/dynamoConfig.js";

export const ingredientModel = {
  addIngredient: async (ingredientData) => {
    const params = {
      TableName: INGREDIENTS_TABLE,
      Item: {
        ingredientID: await getNewId(),
        ingredientName: ingredientData.name,
        stock: ingredientData.stock,
        units: ingredientData.units,
        priceForExtra: ingredientData.priceForExtra,
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
    //const ingredientIDs = [10003, 10004];

    const params = {
      RequestItems: {
        [INGREDIENTS_TABLE]: {
          Keys: ingredientIDs, // Pass the array of keys
        },
      },
    };
    const data = await db.batchGet(params);
    console.log(data.Responses[INGREDIENTS_TABLE]);
    return data.Responses[INGREDIENTS_TABLE];
  },
  editIngredient: async (ingredientData) => {
    const params = {
      TableName: INGREDIENTS_TABLE,
      Key: {
        ingredientID: ingredientData.ingredientID, // Identify the item to update
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
      ReturnValues: "ALL_NEW", // Return the updated item
    };
    const data = db.update(params);
    return data;
  },
};

// Vet inte om detta är rätt väg att gå.
// Om vi använder den bör vi köra den dynamiskt så att vi kan använda denna funktion i fler tabeller
const getNewId = async () => {
  // Scan the table to get all existing IDs
  const { Items } = await db.scan({ TableName: INGREDIENTS_TABLE });

  // Extract the IDs and find the maximum
  const ids = Items.map((item) => item.ingredientID);
  const maxId = ids.length > 0 ? Math.max(...ids) : 10000;

  // Return the next ID as a string
  return maxId + 1;
};
