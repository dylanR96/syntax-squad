import { db } from "../config/dynamoConfig.js";
import { ORDERS_TABLE } from "../constants/tableNames.js";
import { createID } from "../utils/dynamodbHelper.js";
import { ingredientModel } from "./ingredientModel.js";
import { productModel } from "./productModel.js";

export const orderModel = {
  createOrder: async (orderData, userID) => {
    const orderID = await createID(ORDERS_TABLE, "orderNO", 1000);
    const params = {
      TableName: ORDERS_TABLE,
      Item: {
        orderNO: orderID,
        userID: userID,
        orderDate: new Date().toISOString(),
        status: "pending",
        products: orderData.products,
        comment: orderData.comment,
        price: orderData.price,
        address: orderData.address,
        zipcode: orderData.zipcode,
        city: orderData.city,
        phoneNumber: orderData.phoneNumber,
      },
    };
    // const data = await db.put(params);
    // console.log(orderData);
    changeStock(orderData.products, "minus");
    return orderID;
  },
  changeOrder: async (orderData) => {
    const params = {
      TableName: ORDERS_TABLE,
      Key: {
        orderNO: orderData.orderNO,
      },
      UpdateExpression: `
                set 
                    #orderDate = :orderDate,
                    #products = :products,
                    #comment = :comment,
                    #price = :price,
                    #address = :address,
                    #zipcode = :zipcode,
                    #city = :city,
                    #phoneNumber = :phoneNumber
            `,
      ExpressionAttributeNames: {
        "#orderDate": "orderDate",
        "#products": "products",
        "#comment": "comment",
        "#price": "price",
        "#address": "address",
        "#zipcode": "zipcode",
        "#city": "city",
        "#phoneNumber": "phoneNumber",
      },
      ExpressionAttributeValues: {
        ":orderDate": new Date().toISOString(),
        ":products": orderData.products,
        ":comment": orderData.comment,
        ":price": orderData.price,
        ":address": orderData.address,
        ":zipcode": orderData.zipcode,
        ":city": orderData.city,
        ":phoneNumber": orderData.phoneNumber,
      },
      ReturnValues: "UPDATED_NEW",
    };

    const data = db.update(params);
    return data;
  },

  deleteOrder: async (orderData) => {
    const params = {
      TableName: ORDERS_TABLE,
      Key: {
        orderNO: orderData.orderNO,
      },
    };
    const data = await db.delete(params);
    return data;
  },

  getOrderByUserID: async (userID) => {
    const params = {
      TableName: ORDERS_TABLE,
      IndexName: "UserIDIndex",
      KeyConditionExpression: "userID = :userID",
      ExpressionAttributeValues: {
        ":userID": userID,
      },
    };

    const data = await db.query(params);
    return data.Items;
  },

  changeOrderStatus: async (orderData) => {
    const params = {
      TableName: ORDERS_TABLE,
      Key: {
        orderNO: orderData.orderNO,
      },
      UpdateExpression: `
                set 
                    #status = :status
            `,
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":status": orderData.status,
      },
      ReturnValues: "UPDATED_NEW",
    };

    const data = db.update(params);
    return data;
  },

  getOrder: async (orderNO) => {
    const params = {
      TableName: ORDERS_TABLE,
      Key: { orderNO },
    };
    const { Item: data } = await db.get(params);
    return data;
  },

  getAllOrders: async () => {
    const { Items } = await db.scan({ TableName: ORDERS_TABLE });
    return Items;
  },
};
const changeStock = async (products, plusMinus = "minus") => {
  // Loop products
  products.map(async (product) => {
    // Fetch ingredients from product table
    const { ingredients } = await productModel.getProduct(product.productID);
    // Variable for better readability
    const excludeIngredients = product.exclude;
    // Remove excluded ingredients from the products ingredients
    const newIngredients = ingredients.filter((ingredient) => {
      return !excludeIngredients.includes(ingredient.id);
    });

    // Loop the ingredients that's still on the product
    newIngredients.map(async (ingredient) => {
      // Call new function to change the quantity, prepared to be implemented on orderDelete
      const data = await ingredientModel.changeStock(
        ingredient.id,
        ingredient.quantity,
        plusMinus
      );
    });
  });
};
