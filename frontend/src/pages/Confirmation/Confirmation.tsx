import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Confirmation.css";
import OrderTotal from "./OrderTotal";
import { ENDPOINT_GET_ORDERS_BY_ID } from "../../endpoints/apiEndpoints";

interface Product {
  exclude: number[];
  quantity: number;
  productID: number;
  price: number;
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

const Confirmation: React.FC = () => {
  const { orderNO } = useParams<{ orderNO: string }>(); // Hämta ordernummer från URL
  const [order, setOrder] = useState<Order | null>(null); // State för orderdata
  const [loading, setLoading] = useState<boolean>(true); // Laddningstillstånd
  const [error, setError] = useState<string | null>(null); // Felmeddelande

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(ENDPOINT_GET_ORDERS_BY_ID);
        if (!response.ok) {
          throw new Error("Kunde inte hämta orderinformation.");
        }
        const data = await response.json();
    
        // Om `data` är en array, använd find
        if (Array.isArray(data)) {
          const matchedOrder = data.find(
            (order: Order) => order.orderNO === Number(orderNO)
          );
          if (!matchedOrder) {
            throw new Error("Ingen matchande order hittades.");
          }
          setOrder(matchedOrder);
        } else {
          // Om `data` är ett objekt, kontrollera om det matchar
          if (data.orderNO !== Number(orderNO)) {
            throw new Error("Ordernumret matchar inte.");
          }
          setOrder(data);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    console.log(orderNO);

    fetchOrder();
  }, [orderNO]);

  if (loading) {
    return <p>Laddar orderinformation...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!order) {
    return <p>Ingen order hittades.</p>;
  }

  return (
    <div className="wrapper">
      <main className="container">
        <section className="confirmation__textbox">
          <article className="confirmation__part">
            <h1 className="h1--dark">Orderbekräftelse</h1>
            <p className="h5--dark">Ordernummer: #{order.orderNO}</p>
          </article>
          <article className="confirmation__part">
            <h2 className="h3--dark">Produkter</h2>
            {order.products.map((product, index) => (
              <div key={index}>
                <p className="h5--dark">
                  Produkt-ID: {product.productID}, Antal: {product.quantity}, Pris
                  per styck: {product.price} SEK
                </p>
              </div>
            ))}
          </article>
          <article className="confirmation__part">
            <h3 className="h4--dark">Kommentar/meddelande</h3>
            <p className="h5--dark">{order.comment || "Ingen kommentar"}</p>
          </article>
          <article className="confirmation__part">
            <h3 className="h4--dark">Leveransadress</h3>
            <p className="h5--dark">
              {order.address}, {order.zipcode}, {order.city}
            </p>
          </article>
          <article className="confirmation__part">
            <h3 className="h4--dark">Telefonnummer</h3>
            <p className="h5--dark">{order.phoneNumber}</p>
          </article>
          <OrderTotal total={order.price} />
        </section>
        <section className="confirmation__buttons">
          <button className="confirmation__cancel-button">Avbryt order</button>
          <button className="confirmation__OK-button">Ok</button>
        </section>
      </main>
    </div>
  );
};

export default Confirmation;
