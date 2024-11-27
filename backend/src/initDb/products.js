import { PRODUCTS_TABLE } from "../constants/tableNames.js";
let productID = 101;
const productBatchWriteRequests = [
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Chokladkaka", // Chocolate Cake
        ingredients: [
          { id: 10001, quantity: 300 }, // Vetemjöl (Flour) - 300g
          { id: 10002, quantity: 200 }, // Socker (Sugar) - 200g
          { id: 10008, quantity: 100 }, // Chokladknappar (Chocolate Chips) - 100g
          { id: 10003, quantity: 150 }, // Smör (Butter) - 150g
          { id: 10009, quantity: 2 }, // Ägg (Eggs) - 2 pieces
          { id: 10012, quantity: 50 }, // Mjölk (Milk) - 50ml
          { id: 10006, quantity: 5 }, // Vaniljsocker (Vanilla Sugar) - 5g
        ],
        tags: ["cake", "chocolate", "dessert"],
        price: 85.0,
        specialOffer: false,
        description:
          "A rich and moist Swedish chocolate cake with a burst of chocolate chips.",
        createdAt: new Date().toISOString(),
      },
    },
  },
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Kanelbullar", // Cinnamon Buns
        ingredients: [
          { id: 10001, quantity: 500 }, // Vetemjöl (Flour) - 500g
          { id: 10002, quantity: 200 }, // Socker (Sugar) - 200g
          { id: 10003, quantity: 150 }, // Smör (Butter) - 150g
          { id: 10005, quantity: 10 }, // Bakpulver (Baking Powder) - 10g
          { id: 10009, quantity: 3 }, // Ägg (Eggs) - 3 pieces
          { id: 10013, quantity: 50 }, // Grädde (Cream) - 50ml
          { id: 10014, quantity: 5 }, // Kardemumma (Cardamom) - 5g
        ],
        tags: ["cinnamon", "sweet", "buns", "swedish"],
        price: 65.0,
        specialOffer: true,
        description:
          "Classic Swedish cinnamon buns with a soft, fluffy texture and a hint of cardamom.",
        createdAt: new Date().toISOString(),
      },
    },
  },
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Pepparkakor", // Ginger Cookies
        ingredients: [
          { id: 10001, quantity: 250 }, // Vetemjöl (Flour) - 250g
          { id: 10002, quantity: 150 }, // Socker (Sugar) - 150g
          { id: 10003, quantity: 100 }, // Smör (Butter) - 100g
          { id: 10006, quantity: 5 }, // Vaniljsocker (Vanilla Sugar) - 5g
          { id: 10007, quantity: 10 }, // Kanel (Cinnamon) - 10g
          { id: 10010, quantity: 1 }, // Ägg (Eggs) - 1 piece
          { id: 10011, quantity: 30 }, // Honung (Honey) - 30g
        ],
        tags: ["cookie", "ginger", "spicy", "holiday"],
        price: 45.0,
        specialOffer: false,
        description:
          "Crispy and spiced ginger cookies, a perfect Swedish treat for the holidays.",
        createdAt: new Date().toISOString(),
      },
    },
  },
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Muffins", // Muffins
        ingredients: [
          { id: 10001, quantity: 300 }, // Vetemjöl (Flour) - 300g
          { id: 10002, quantity: 200 }, // Socker (Sugar) - 200g
          { id: 10003, quantity: 150 }, // Smör (Butter) - 150g
          { id: 10009, quantity: 2 }, // Ägg (Eggs) - 2 pieces
          { id: 10012, quantity: 100 }, // Mjölk (Milk) - 100ml
          { id: 10008, quantity: 50 }, // Chokladknappar (Chocolate Chips) - 50g
        ],
        tags: ["muffins", "chocolate", "dessert"],
        price: 55.0,
        specialOffer: true,
        description: "Soft and fluffy muffins filled with chocolate chips.",
        createdAt: new Date().toISOString(),
      },
    },
  },
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Vaniljdrömmar", // Vanilla Cookies
        ingredients: [
          { id: 10001, quantity: 300 }, // Vetemjöl (Flour) - 300g
          { id: 10002, quantity: 150 }, // Socker (Sugar) - 150g
          { id: 10003, quantity: 100 }, // Smör (Butter) - 100g
          { id: 10006, quantity: 5 }, // Vaniljsocker (Vanilla Sugar) - 5g
          { id: 10010, quantity: 1 }, // Ägg (Eggs) - 1 piece
          { id: 10014, quantity: 10 }, // Kardemumma (Cardamom) - 10g
        ],
        tags: ["cookie", "vanilla", "sweet", "swedish"],
        price: 50.0,
        specialOffer: false,
        description:
          "Soft, sweet vanilla cookies with a delicate hint of cardamom.",
        createdAt: new Date().toISOString(),
      },
    },
  },
];
export const productParams = {
  RequestItems: {
    [PRODUCTS_TABLE]: productBatchWriteRequests,
  },
};
