import "./Checkout.css";
import React, { useState, useEffect } from "react";
import back from "../../assets/images/back.svg";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  addInfo,
} from "../../features/order/orderSlice";
import { fetchProducts } from "../../features/products/productsSlice";
import { address } from "framer-motion/client";
import { jwtToken } from "../../features/fetchFromApi";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [userInfo, setUserInfo] = useState({
    comment: "",
    address: "",
    zipcode: "",
    city: "",
    phoneNumber: "",
  });

  const [orderNO, setOrderNO] = useState<number>();
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { products, status: productsStatus } = useSelector(
    (state: RootState) => state.products
  );
  const orderedProductsArray = useSelector(
    (state: RootState) => state.order.products
  );

  const fullOrder = useSelector((state: RootState) => state.order);

  useEffect(() => {
    console.log("Full order start", JSON.stringify(fullOrder, null, 2));
  }, [fullOrder]);

  /* Dispatch Products API */
  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => {
      return {
        ...prevUserInfo,
        [name]: value,
      };
    });
  };

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => {
      return {
        ...prevUserInfo,
        [name]: value,
      };
    });
  };

  const [sendRequest, setSendRequest] = useState<boolean>(false);

  useEffect(() => {
    async function skicka() {
      try {
        const response = await fetch(
          "https://ez7mtpao6i.execute-api.eu-north-1.amazonaws.com/order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(fullOrder),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setOrderNO(data);
          console.log("DATA ORDER", data);
          console.log("Order created successfully");
        } else {
          console.error("Failed to create order");
        }
      } catch (error) {
        console.error("Error creating order:", error);
      }
    }

    if (sendRequest) {
      skicka();
    }
  }, [sendRequest]);

  useEffect(() => {
    if (orderNO) {
      console.log("ordernumber navigate GO!!", orderNO);
      navigate(`/confirmation/${orderNO}`);
    }
  }, [orderNO, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addInfo(userInfo));

    setUserInfo({
      comment: "",
      address: "",
      zipcode: "",
      city: "",
      phoneNumber: "",
    });

    setSendRequest(true);
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
              value={userInfo.comment}
              onChange={handleChange}
              className="special-request__input"
              rows={5}
              cols={33}
            />
          </label>
          <label className="special-request">
            Address
            <input
              type="text"
              id="address"
              name="address"
              value={userInfo.address}
              onChange={handleUserInfoChange}
              className="special-request__input"
            />
          </label>
          <label className="special-request">
            Postnummer
            <input
              type="text"
              name="zipcode"
              id="zipcode"
              value={userInfo.zipcode}
              onChange={handleUserInfoChange}
              className="special-request__input"
            />
          </label>
          <label className="special-request">
            Stad
            <input
              type="text"
              name="city"
              id="city"
              value={userInfo.city}
              onChange={handleUserInfoChange}
              className="special-request__input"
            />
          </label>
          <label className="special-request">
            Telefon
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={userInfo.phoneNumber}
              onChange={handleUserInfoChange}
              className="special-request__input"
            />
          </label>

          <div className="cart-total">
            <div className="cart-total__price-container">
              <h3 className="cart-total__title">Totalt</h3>
              <h3 className="cart-total__price">{`${fullOrder.price} SEK`}</h3>
            </div>
            <button
              className="cart__button"
              /* style={{ backgroundColor: noInfo ? "grey" : "#cc8d80" }} */
              /* disabled={!userInfo} */
            >
              {/* {noInfo ? "Fyll i uppgifter" : "Beställ"} */}
              Beställ
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Checkout;
