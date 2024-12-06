import "./Checkout.css";
import React, { useState, useEffect } from "react";
import back from "../../assets/images/back.svg";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  addComment,
} from "../../features/order/orderSlice";
import { fetchProducts } from "../../features/products/productsSlice";

const Checkout = () => {
  const [commentValue, setCommentValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { products, status: productsStatus } = useSelector(
    (state: RootState) => state.products
  );
  const orderedProductsArray = useSelector(
    (state: RootState) => state.order.products
  );

  const fullOrder = useSelector((state: RootState) => state.order);

  useEffect(() => {
    console.log("Global Order State:", JSON.stringify(fullOrder, null, 2));
  }, [fullOrder]);

  /* Dispatch Products API */
  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addComment(commentValue));
    setCommentValue("");
  };

  return (
    <main className="checkout-main">
      <section className="checkout">
        <Link to="/home">
          <img src={back} className="checkout__back-icon" />
        </Link>
        <h1 className="checkout__heading">Kundvagn</h1>

        <div className="cart__title-container">
          <h2 className="cart__title">Produkt</h2>
        </div>
        {orderedProductsArray.map((order) => {
          const product = products?.find(
            (product) => product.productID === order.productID
          );

          return (
            <div className="cart-product">
              <div className="checkout-product-container">
                <h3 className="cart-product__title">
                  {product ? product.productName : "Okänd Produkt"}
                </h3>
                <h3 className="cart-product__price">{`${order.price} sek`}</h3>
              </div>

              <div className="checkout-change-quantity">
                <i
                  className="fa-solid fa-minus quantity-icon"
                  onClick={() => dispatch(decreaseQuantity(order.productID))}
                ></i>
                <h3 className="cart-product__title">{order.quantity}</h3>
                <i
                  className="fa-solid fa-plus quantity-icon"
                  onClick={() => dispatch(increaseQuantity(order.productID))}
                ></i>
              </div>
            </div>
          );
        })}

        <form onSubmit={handleSubmit}>
          <label className="special-request">
            Specialönskemål/allergier
            <textarea
              id="comment"
              name="comment"
              value={commentValue}
              onChange={handleChange}
              className="special-request__input"
              rows={5}
              cols={33}
            />
          </label>
          <div className="cart-total">
            <div className="cart-total__price-container">
              <h3 className="cart-total__title">Totalt</h3>
              <h3 className="cart-total__price">{`${fullOrder.price} SEK`}</h3>
            </div>
            <button className="cart__button">Beställ</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Checkout;
