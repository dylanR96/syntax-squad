import { db } from "../config/dynamoConfig.js";
import { ORDERS_TABLE } from "../constants/tableNames.js";
import { nanoid } from "nanoid";
import { createID } from "../utils/dynamodbHelper.js";

export const orderModel = {
    createOrder: async (orderData) => {
        const params = {
        TableName: ORDERS_TABLE,
        Item: {
          orderNO: await createID(ORDERS_TABLE, "orderNO", 1000),
          userID: nanoid(),
          orderDate: new Date().toISOString(),
          status: orderData.status,
          products: orderData.products,
          comment: orderData.comment,
          price: orderData.price,
          address: orderData.address,
          zipcode: orderData.zipcode,
          city: orderData.city,
          phoneNumber: orderData.phoneNumber,
        },
    }
    const data = await db.put(params);
    return data;
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
                '#orderDate': 'orderDate',
                '#products': 'products',
                '#comment': 'comment',
                '#price': 'price',
                '#address': 'address',
                '#zipcode': 'zipcode',
                '#city': 'city',
                '#phoneNumber': 'phoneNumber',
            },
            ExpressionAttributeValues: {
                ':orderDate': new Date().toISOString(),
                ':products': orderData.products,
                ':comment': orderData.comment,
                ':price': orderData.price,
                ':address': orderData.address,
                ':zipcode': orderData.zipcode,
                ':city': orderData.city,
                ':phoneNumber': orderData.phoneNumber,
            },
            ReturnValues: 'UPDATED_NEW', 
        };

        const data = db.update(params);
        return data;
    },

    deleteOrder: async (orderData) => {
        const params = {
            TableName: ORDERS_TABLE,
            Key: {
                orderNO: orderData.orderNO
            }
        }
        const data = await db.delete(params);
        return data;
    },
    changeOrderStatus: async (orderData) => {
        const params = {
            TableName: ORDERS_TABLE,
            Key: {
              orderNO: orderData.orderNO,
            },
            UpdateExpression: 
            `
                set 
                    #status = :status,
                    #comment = :comment
            `,
            ExpressionAttributeNames: {
                '#status': 'status',
                '#comment': 'comment',
            },
            ExpressionAttributeValues: {
                ':status': orderData.status,
                ':comment': orderData.comment,
            },
            ReturnValues: 'UPDATED_NEW',
        }

        const data = db.update(params);
        return data;
    }
}