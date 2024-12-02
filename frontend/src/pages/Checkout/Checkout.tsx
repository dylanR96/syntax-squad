import "./Checkout.css";
import back from "../../assets/images/back.svg";
import remove from "../../assets/images/remove.svg";
import { Link } from "react-router-dom";

const Checkout = () => {
  return (
    <main className="checkout-main">
      <section className="checkout">
        <Link to="/home">
          <img src={back} className="checkout__back-icon" />
        </Link>
        <h1 className="checkout__heading">Kundvagn</h1>

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

        <label className="special-request">
          Specialönskemål/allergier
          <textarea
            className="special-request__input"
            name="specialRequest"
            rows={5}
            cols={33}
          />
        </label>

        <div className="cart-total">
          <div className="cart-total__price-container">
            <h3 className="cart-total__title">Totalt</h3>
            <h3 className="cart-total__price">60 sek</h3>
          </div>
          <button className="cart__button">Beställ</button>
        </div>
      </section>
    </main>
  );
};

export default Checkout;
