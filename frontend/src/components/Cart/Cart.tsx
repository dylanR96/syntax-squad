import "./Cart.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getIngredientNameById } from "../../features/ingredients/ingredientFunctions";
import { ENDPOINT_ALL_PRODUCTS } from "../../endpoints/apiEndpoints";
import { useEffect, useState } from "react";
import { jwtToken } from "../../features/fetchFromApi";

interface ProductIngredient {
  id: number; // ID för ingrediensen
  quantity: number; // Mängd av ingrediensen
}

interface Product {
  productID: number;
  productName: string;
  description: string;
  price: number;
  image: string;
  bakingTime: string;
  tags: string[];
  ingredients: ProductIngredient[];
  recipe: string[];
}

const cartVariants = {
  open: {
    x: 0,
    transition: {
      ease: "easeInOut",
    },
  },
  closed: {
    x: "100%",
    transition: {
      ease: "easeInOut",
    },
  },
};

const Cart = () => {
  const cartState = useSelector((state: RootState) => state.order.products);

  console.log("cartSate", cartState);

  const [products, setProducts] = useState<Product[]>([]);
  console.log("ALL PRODUCTS", products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://ez7mtpao6i.execute-api.eu-north-1.amazonaws.com/products",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("All data", data);
        setProducts(data);

        return data;
      } catch (error) {
        console.error("Error fetching ingredients:", error);
        throw error;
      }
    };
    fetchProducts();
  }, [jwtToken]);

  return (
    <motion.div
      className="cart"
      variants={cartVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <div className="cart__title-container">
        <h2 className="cart__title">Produkt</h2>
        <h2 className="cart__title">Pris</h2>
      </div>
      <div className="cart__content">
        {cartState.map((cartProduct) => {
          if (products) {
            const recipe =
              products.find(
                (product) => product.productID === Number(cartProduct.productID)
              ) || null;
            const excludedIngredient: string[] = [];
            cartProduct.exclude.map((myIngredient) => {
              const ingredientName = getIngredientNameById(myIngredient);
              if (ingredientName) {
                excludedIngredient.push(ingredientName);
              }
            });

            return (
              <>
                <div className="cart-product">
                  <h3 className="cart-product__title">{recipe?.productName}</h3>
                  <div className="cart-product__price-container">
                    <h3 className="cart-product__price">
                      {cartProduct.price} sek {}
                    </h3>
                  </div>
                </div>
                {excludedIngredient &&
                  excludedIngredient.map((ingredient) => {
                    return (
                      <div className="body-text--dark">- {ingredient}</div>
                    );
                  })}
              </>
            );
          }
        })}
      </div>
      {/* <div className="cart-additions">
        <h4 className="cart-additions__title">Tillval:</h4>
        <div className="cart-additions__ingredient-container">
          <h5 className="cart-additions__ingredient">Ingrediens</h5>
          <img className="cart-additions__remove" src={remove} />
        </div>
      </div> */}

      <div className="cart-total">
        <div className="cart-total__price-container">
          <h3 className="cart-total__title">Totalt</h3>
          <h3 className="cart-total__price">60 sek</h3>
        </div>
        <Link to="/checkout">
          <button className="cart__button">Till kassan</button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Cart;
