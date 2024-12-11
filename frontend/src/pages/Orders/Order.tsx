import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../Confirmation/Confirmation.css";
import {
  ENDPOINT_GET_ORDERS_BY_ID,
  ENDPOINT_PRODUCT,
} from "../../endpoints/apiEndpoints";
import { API_CALL_GET } from "../../features/fetchFromApi";
import OrderTotal from "../Confirmation/OrderTotal";
import { formatDateTime } from "../../utils/formatters";
import { jwtToken } from "../../features/fetchFromApi";

interface Product {
  exclude: number[];
  quantity: number;
  productID: number;
  price: number;
  name?: string; // Nytt fält för produktnamn
}

interface Order {
  phoneNumber: string;
  city: string;
  orderDate: string;
  orderNO: number;
  zipcode: string;
  products: Product[];
  userID: string;
  status: string;
  comment: string;
  address: string;
  price: number;
}

const Order: React.FC = () => {
  const { orderNO } = useParams<{ orderNO: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  if (!jwtToken) {
    console.error("JWT-token saknas i cookies.");
  }

  useEffect(() => {
    const fetchOrderAndProducts = async () => {
      try {
        const response = await fetch(ENDPOINT_GET_ORDERS_BY_ID, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch order information.");
        }

        const data: Order[] = await response.json();
        const matchedOrder = data.find(
          (order) => order.orderNO === Number(orderNO)
        );

        if (!matchedOrder) {
          throw new Error("Order not found.");
        }

        const productsWithNames = await Promise.all(
          matchedOrder.products.map(async (product) => {
            try {
              const productData = await API_CALL_GET(
                `${ENDPOINT_PRODUCT}/${product.productID}`
              );

              return { ...product, name: productData.productName };
            } catch (error) {
              console.error(
                `Error fetching product ${product.productID}:`,
                error
              );
              return { ...product, name: "Okänd produkt" };
            }
          })
        );

        setOrder({ ...matchedOrder, products: productsWithNames });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderAndProducts();
  }, [orderNO, jwtToken]);

  const handleDeleteOrder = async () => {
    try {
      const response = await fetch(
        `https://ez7mtpao6i.execute-api.eu-north-1.amazonaws.com/order/${orderNO}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the order.");
      }

      console.log("Order deleted successfully.");
      navigate("/profile"); // Navigera till profilsidan
    } catch (error) {
      console.error("Error deleting order:", error);
      setError("Kunde inte ta bort ordern.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!order) {
    return <p>No order found.</p>;
  }

  console.log(order);
  return (
    <div className="wrapper">
      <main className="container">
        <section className="confirmation__textbox">
          <article className="confirmation__part">
            <h1 className="h1--dark">Orderbekräftelse</h1>
            <p className="h5--dark">Ordernummer: #{order.orderNO}</p>
            <p className="h5--dark">Datum: {formatDateTime(order.orderDate)}</p>
            <p className="h5--dark">Status: {order.status}</p>
          </article>
          <article className="confirmation__part">
            <h4 className="h4--dark">Produkter</h4>
            {order.products.map((product, index) => (
              <div key={index}>
                <p className="h5--dark">
                  {" "}
                  <Link
                    to={`/recipe/${product.productID}`}
                    className="product-link"
                  >
                    {product.name}
                  </Link>
                </p>
                <p className="h5--dark">Antal: {product.quantity}</p>
                <p className="h5--dark">Pris per styck: {product.price} SEK</p>
              </div>
            ))}
          </article>
          <article className="confirmation__part">
            <h4 className="h4--dark">Kommentar/meddelande</h4>
            <p className="h5--dark">{order.comment || "Ingen kommentar"}</p>
          </article>
          <article className="confirmation__part">
            <h3 className="h4--dark">Leveransadress</h3>
            <p className="h5--dark">{order.address}</p>
            <p className="h5--dark">
              {order.zipcode} {order.city}
            </p>
          </article>
          <OrderTotal total={order.price} />
          <section className="confirmation__buttons">
            <button
              className="confirmation__cancel-button"
              onClick={handleDeleteOrder}
            >
              Avbryt order
            </button>
            <button
              className="confirmation__OK-button"
              onClick={() => navigate("/profile")}
            >
              Ok
            </button>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Order;
