import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import profilePicture from "../../assets/images/profile_picture.png";
import ProfileEditButton from "../../components/ui/ProfileEditButton";
import LogoutButton from "../../components/ui/LogoutButton";
import { ENDPOINT_GET_ORDERS_BY_ID } from "../../endpoints/apiEndpoints";
import { GetOrdersByUserID } from "./types";
import { jwtToken } from "../../features/fetchFromApi";
import { Link } from "react-router-dom";
import { formatDateTime } from "../../utils/formatters";

interface ApiResponse {
  orderNO: number;
  price: number;
  orderDate: string;
  comment: string;
  status: string;
}

const Profile: React.FC = () => {
  const [orders, setOrders] = useState<GetOrdersByUserID[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const getOrdersByUserID = async (
    url: string
  ): Promise<GetOrdersByUserID[]> => {
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

      const data: GetOrdersByUserID[] = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
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

  const mapOrderStatus = (status: string): string => {
    const statusMapping: { [key: string]: string } = {
      pending: "Behandlas",
      confirmed: "Färdig",
      done: "Skickad",
    };
  
    return statusMapping[status] || "Okänd status"; // Fallback om statusvärdet inte matchar
  };
  
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
  <div className="profile__order-history" key={order.orderNO}>
    <Link to={`/confirmation/${order.orderNO}`} className="profile__order-link">
      Order: {order.orderNO}
    </Link>
    <p className="profile__order-status">{mapOrderStatus(order.status)}</p>
    <p className="profile__order-date">{formatDateTime(order.orderDate)}</p>
    <p className="profile__order-amount">{order.price} kr</p>
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
