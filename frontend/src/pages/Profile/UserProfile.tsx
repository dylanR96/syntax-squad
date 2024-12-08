import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import profilePicture from "../../assets/images/profile_picture.png";
import ProfileEditButton from "../../components/ui/ProfileEditButton";
import LogoutButton from "../../components/ui/LogoutButton";
import { ENDPOINT_GET_ORDERS_BY_ID } from "../../endpoints/apiEndpoints";

interface ApiResponse {
  orderNO: number;
  price: number;
  orderDate: string;
  comment: string;
  status: string;
}

const Profile: React.FC = () => {
  const [orders, setOrders] = useState<ApiResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandOrder, setExpandOrder] = useState<number | null>(null)

  function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }

  const jwtToken = getCookie("userToken");

  const getOrdersByUserID = async (url: string): Promise<ApiResponse[]> => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: ApiResponse[] = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const formatDateTime = (orderDate: string): string => {
    const [date, time] = orderDate.split("T");
    const [hour, minute] = time.split(":");
    return `${date} ${hour}:${minute}`;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrdersByUserID(ENDPOINT_GET_ORDERS_BY_ID);
        setOrders(ordersData);
      } catch (error) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const openOrder = (orderNO: number) => {
    setExpandOrder((prev) => (prev === orderNO ? null : orderNO))
  }

  return (
    <>
      <main className="container">
        <div className="profile__container">
          <img
            className="profile__image"
            src={profilePicture}
            alt="Profile Picture"
          />
          <h2 className="profile__name">John Dough</h2>
        </div>
        <h2 className="profile__header">Orderhistorik</h2>
        {loading && <p>Loading orders...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && orders.length === 0 && <p>No orders found.</p>}
        {orders.map((order) => (
          <div
            className="profile__order-history"
            key={order.orderNO}
            onClick={() => openOrder(order.orderNO)}
          >
            <p className="profile__order-number">Order: {order.orderNO}</p>
            <p className="profile__order-date">
              {formatDateTime(order.orderDate)}
            </p>
            <p className="profile__order-amount">{order.price}kr</p>
            {expandOrder === order.orderNO && (
              <div>
              <p>Status: {order.status}</p>
                <p>Comment: {order.comment}</p>
              </div>
            )}
            </div>
        ))}
      
        <div className="profile__buttons">
          <ProfileEditButton />
          <LogoutButton />
        </div>
      </main>
    </>
  );
};

export default Profile;
