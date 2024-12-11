import React, { useState, useEffect } from "react";
import "./Orders.css";
import {
  ENDPOINT_ALL_ORDERS,
  ENDPOINT_UPDATE_ORDER_STATUS,
} from "../../endpoints/apiEndpoints";
import { jwtToken } from "../../features/fetchFromApi";

// interface FormData {
//   address: string;
//   postalCode: string;
//   phone: string;
//   comment: string;
// }

interface Product {
  productID: number;
  quantity: number;
  price: number;
  exclude: number[];
}

interface Order {
  orderNO: number;
  phoneNumber: string;
  city: string;
  orderDate: string;
  zipcode: string;
  products: Product[];
  userID: string;
  status: string;
  comment: string;
  address: string;
  price: number;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("");

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Order>>({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(ENDPOINT_ALL_ORDERS, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFilteredOrders(data);
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (filterStatus) {
      setFilteredOrders(
        orders.filter((order) => order.status === filterStatus)
      );
    } else {
      setFilteredOrders(orders);
    }
  }, [orders, filterStatus]);

  const filterOrdersByStatus = (status: string) => {
    setFilterStatus(status);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    orderNO: number
  ): Promise<void> => {
    const newStatus = e.target.value;

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderNO === orderNO ? { ...order, status: newStatus } : order
      )
    );

    try {
      const response = await fetch(ENDPOINT_UPDATE_ORDER_STATUS, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ orderNO, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Status updated on backend:", data);
      filterOrdersByStatus(filterStatus);
    } catch (error) {
      console.error("Failed to update status on backend:", error);
    }
  };

  const handleEditToggle = (): void => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (): void => {
    console.log("Uppdaterad data:", formData);
    setIsEditing(false);
  };

  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleString("sv-SE", options);
  };

  return (
    <main className="container">
      <section className="orders__container">
        <h1 className="h1--dark">Ordrar</h1>
        <section className="orders__status">
          <h6 className="h6--dark">Visa:</h6>
          <button
            className="orders__tag--green orders__tag-text"
            onClick={() => filterOrdersByStatus("done")}
          >
            Klar
          </button>
          <button
            className="orders__tag--red orders__tag-text"
            onClick={() => filterOrdersByStatus("pending")}
          >
            Obekräftad
          </button>
          <button
            className="orders__tag--blue orders__tag-text"
            onClick={() => filterOrdersByStatus("confirmed")}
          >
            Bekräftad
          </button>
          <button
            className="orders__tag--gray orders__tag-text"
            onClick={() => filterOrdersByStatus("")}
          >
            Alla
          </button>
        </section>

        <section className="orders__all-orders-container">
          {filteredOrders.map((order) => (
            <article key={order.orderNO} className="orders__card-container">
              {/* Ordernummer */}

              <article className="card-detail-info">
                <h6 className="h6--dark">Ordernummer</h6>
                <p className="h5--dark">{order.orderNO}</p>
              </article>

              {/* Pris */}

              <article className="card-detail-info">
                <h6 className="h6--dark">Pris</h6>
                <p className="h5--dark">{order.price}</p>
              </article>

              {/* Datum */}

              <article className="card-detail-info">
                <h6 className="h6--dark">Datum</h6>
                <p className="h5--dark">{formatDate(order.orderDate)}</p>
              </article>

              {/* Recept */}

              <article className="card-detail-info">
                <h6 className="h6--dark">Recept</h6>
                <ul>
                  {Array.isArray(order.products) ? (
                    order.products.map((product, index) => (
                      <li key={index}>
                        Produkt ID: {product.productID}, Antal:{" "}
                        {product.quantity}
                        {product.exclude?.length > 0 && (
                          <p>Exkludera: {product.exclude.join(", ")}</p>
                        )}
                      </li>
                    ))
                  ) : (
                    <p>Hittar inga produkter</p>
                  )}
                </ul>
              </article>

              {/* Adress */}
              <article className="card-detail-info">
                <h6 className="h6--dark">Adress</h6>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="h5--dark">{order.address}</p>
                )}
              </article>
              {/* Postnummer */}
              <article className="card-detail-info">
                <h6 className="h6--dark">Postnummer</h6>
                {isEditing ? (
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.zipcode}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="h5--dark">{order.zipcode}</p>
                )}
              </article>
              {/* Telefon nummer */}
              <article className="card-detail-info">
                <h6 className="h6--dark">Telefon nummer</h6>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="h5--dark">{order.phoneNumber}</p>
                )}
              </article>
              {/* Kommentar */}
              <article className="card-detail-info">
                <h6 className="h6--dark">Kommentar</h6>
                {isEditing ? (
                  <input
                    type="text"
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="h5--dark">{order.comment}</p>
                )}
              </article>

              {/* Status */}
              <article className="card-detail-info">
                <h6 className="h6--dark">Status</h6>
                <select
                  name="status"
                  value={order.status}
                  onChange={(e) => handleStatusChange(e, order.orderNO)}
                  className={`orders__status-select ${
                    order.status === "pending"
                      ? "pending"
                      : order.status === "confirmed"
                      ? "confirmed"
                      : "done"
                  }`}
                >
                  <option value="pending">Obekräftad</option>
                  <option value="confirmed">Bekräftad</option>
                  <option value="done">Klar</option>
                </select>
              </article>
              {isEditing ? (
                <button
                  className="recipe__button"
                  type="button"
                  onClick={handleSubmit}
                >
                  Spara ändringar
                </button>
              ) : (
                <button
                  className="recipe__button"
                  type="button"
                  onClick={handleEditToggle}
                >
                  Redigera
                </button>
              )}
            </article>
          ))}
        </section>
      </section>
    </main>
  );
};

export default Orders;
