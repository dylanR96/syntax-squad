import { db } from "../config/dynamoConfig.js";
import { PRODUCTS_TABLE } from "../constants/tableNames.js";
import { createID } from "../utils/dynamodbHelper.js";

export const productModel = {
  createProduct: async (productData) => {
    const params = {
      TableName: PRODUCTS_TABLE,
      Item: {
        productID: await createID(PRODUCTS_TABLE, "productID", 100),
        productName: productData.name,
        ingredients: productData.ingredients,
        tags: productData.tags,
        price: productData.price,
        specialOffer: productData.specialOffer,
        description: productData.description,
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
  deleteCustomer: async () => {},
  editCustomer: async () => {},
};
