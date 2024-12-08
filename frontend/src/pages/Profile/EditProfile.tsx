import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import profilePicture from "../../assets/images/profile_picture.png";
import EditProfileForm from "./EditProfileForm";
import { ENDPOINT_CUSTOMER } from "../../endpoints/apiEndpoints";
import profileIcon from "../../assets/images/icons/profileIcon.svg";
import addressIcon from "../../assets/images/icons/addressIcon.svg";
import phoneIcon from "../../assets/images/icons/phoneIcon.svg";

interface ApiResponseEdit {
  email: string;
  address: string;
  zipcode: string;
  city: string;
  phoneNumber: string;
}

interface ApiResponseGet {
  customerID: string;
  phoneNumber: string;
  city: string;
  zipcode: string;
  surname: string;
  firstname: string;
  address: string;
  email: string;
}

const EditProfile: React.FC = () => {
  const [customers, setCustomer] = useState<ApiResponseGet | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }

  const jwtToken = getCookie("userToken");

  const getCustomer = async (url: string): Promise<ApiResponseGet> => {
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

      const data: ApiResponseGet = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const editCustomer = async (url: string): Promise<ApiResponseEdit> => {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(customers),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: ApiResponseEdit = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const handleChange = (key: string, value: string) => {
    setCustomer((prev) => (prev ? { ...prev, [key]: value } : null));
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerData = await getCustomer(
          ENDPOINT_CUSTOMER
        );
        setCustomer(customerData);
      } catch (error) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, []);

  return (
    <div className="wrapper">
      <main className="container">
        <div className="profile__container">
          <img
            className="profile__image"
            src={profilePicture}
            alt="Profile Picture"
          />
          <h2 className="profile__name">John Dough</h2>
        </div>
        {loading && <p>Loading user information...</p>}
        {error && <p>{error}</p>}
        {customers ? (
          <div className="profile__order-history" key={customers.customerID}>
            <form className="profile__form">
              <div className="profile__form-group">
                <span className="profile__icon">
                  <img src={profileIcon} alt="Profile Icon" />
                </span>
                <input
                  className="profile__input"
                  type="email"
                  value={customers.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div className="profile__form-group">
                <span className="profile__icon">
                  <img src={addressIcon} alt="Address Icon" />
                </span>
                <input
                  className="profile__input"
                  type="text"
                  value={customers.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
              <div className="profile__form-group">
                <span className="profile__icon">
                  <img src={addressIcon} alt="Address Icon" />
                </span>
                <input
                  className="profile__input"
                  type="text"
                  maxLength={5}
                  value={customers.zipcode}
                  onChange={(e) => handleChange("zipcode", e.target.value)}
                />
              </div>
              <div className="profile__form-group">
                <span className="profile__icon">
                  <img src={addressIcon} alt="Address Icon" />
                </span>
                <input
                  className="profile__input"
                  type="text"
                  value={customers.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              </div>
              <div className="profile__form-group">
                <span className="profile__icon">
                  <img src={phoneIcon} alt="Phone Icon" />
                </span>
                <input
                  className="profile__input"
                  type="tel"
                  value={customers.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                />
              </div>
              <button
                className="profile__save-button"
                type="button"
                onClick={editCustomer}
              >
                Spara ändringar
              </button>
            </form>
          </div>
        ) : (
          <p>No customer data available.</p>
        )}
      </main>
    </div>
  );
};

export default EditProfile;

{
  /* <img src={profileIcon} alt="Profile Icon"/><p className="profile__order-number">Email: {customers.email}</p>
            <img src={addressIcon} alt="Address Icon"/><p className="profile__order-number">Email: {customers.address}</p>
            <img src={addressIcon} alt="Address Icon"/><p className="profile__order-number">Email: {customers.zipcode}</p>
            <img src={addressIcon} alt="Address Icon"/><p className="profile__order-number">Email: {customers.city}</p>
            <img src={phoneIcon} alt="Phone Icon"/><p className="profile__order-number">Email: {customers.phoneNumber}</p> */
}
