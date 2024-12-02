import "./Cart.css";
import remove from "../../assets/images/remove.svg";
// import edit from "../../assets/images/edit.svg";
import { motion } from "framer-motion";

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

      <div className="cart-product">
        <h3 className="cart-product__title">Muffins</h3>
        <div className="cart-product__price-container">
          <h3 className="cart-product__price">60 sek</h3>
          <img className="cart-product__remove" src={remove} />
        </div>
      </div>

      <div className="cart-ingredients">
        <h4 className="cart-ingredients__title">Ingredienser:</h4>
        <div className="cart-ingredients__ingredient-container">
          <h5 className="cart-ingredients__ingredient">Ingrediens</h5>
          {/* <img className="cart-ingredients__edit" src={edit} /> */}
        </div>
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
        <button className="cart__button">Till kassan</button>
      </div>
    </motion.div>
  );
};

export default Cart;
