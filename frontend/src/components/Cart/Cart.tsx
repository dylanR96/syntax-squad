import "./Cart.css";
import remove from "../../assets/images/remove.svg";
// import edit from "../../assets/images/edit.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getIngredientNameById } from "../../features/ingredients/ingredientFunctions";

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
  const { products } = useSelector((state: RootState) => state.products);

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
