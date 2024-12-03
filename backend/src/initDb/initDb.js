import { db } from "../config/dynamoConfig.js";
import { customerParams } from "./customers.js";
import { ingredientParams } from "./ingredients.js";
import { productParams } from "./products.js";

// Batch write requests
const writeData = async () => {
  try {
    await db.batchWrite(customerParams);
    console.log("Customers batch write succeeded!");
    await db.batchWrite(ingredientParams);
    console.log("Ingredients batch write succeeded!");
    await db.batchWrite(productParams);
    console.log("Products batch write succeeded!");
  } catch (err) {
    console.error("Error in batch write:", err);
  }
};

writeData();
