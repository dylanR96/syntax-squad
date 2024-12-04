import { db } from "../config/dynamoConfig.js";
import { PRODUCTS_TABLE } from "../constants/tableNames.js";
import { createID } from "../utils/dynamodbHelper.js";

export const productModel = {
  createProduct: async (productData) => {
    const params = {
      TableName: PRODUCTS_TABLE,
      Item: {
        productID: await createID(PRODUCTS_TABLE, "productID", 100),
        productName: productData.productName,
        ingredients: productData.ingredients,
        tags: productData.tags,
        price: productData.price,
        specialOffer: productData.specialOffer,
        description: productData.description,
        image: productData.image ? productData.image : "",
        bakingTime: productData.bakingTime,
        createdAt: new Date().toISOString(),
      },
    };

    const data = await db.put(params);
    return data;
  },
  getAllProducts: async () => {
    const { Items } = await db.scan({ TableName: PRODUCTS_TABLE });
    return Items;
  },

  getProduct: async (productID) => {
    const params = {
      TableName: PRODUCTS_TABLE,
      Key: { productID },
    };
    const { Item: data } = await db.get(params);
    return data;
  },

  editProduct: async (productData) => {
    const params = {
      TableName: PRODUCTS_TABLE,
      Key: {
        productID: productData.productID,
      },
      UpdateExpression: `SET 
        productName = :productName,
        ingredients = :ingredients,
        tags = :tags,
        price = :price,
        specialOffer = :specialOffer,
        image = :image,
        bakingTime = :bakingTime
        description = :description`,
      ExpressionAttributeValues: {
        ":productName": productData.productName,
        ":ingredients": productData.ingredients,
        ":tags": productData.tags,
        ":price": productData.price,
        ":specialOffer": productData.specialOffer,
        ":image": productData.image ? productData.image : "",
        ":bakingTime": productData.bakingTime,
        ":description": productData.description,
        ":bakingTime": productData.bakingTime,
        ":image": productData.image,
      },
      ReturnValues: "ALL_NEW", // Return the updated item
    };
    const data = db.update(params);
    return data;
  },

  deleteProduct: async (productID) => {
    const params = {
      TableName: PRODUCTS_TABLE,
      Key: { productID },
    };
    const data = await db.delete(params);
    return data;
  },
};
