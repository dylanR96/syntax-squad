import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import profilePicture from "../../assets/images/profile_picture.png";
import EditProfileForm from "./EditProfileForm";
import profileIcon from "../../assets/images/icons/profileIcon.svg";
import addressIcon from "../../assets/images/icons/addressIcon.svg";
import phoneIcon from "../../assets/images/icons/phoneIcon.svg";
import { getCookie } from "../../utils/getCookie";
import { GetCustomer, EditCustomer } from "./types";
import {
  ENDPOINT_CUSTOMER,
  ENDPOINT_EDIT_CUSTOMER,
} from "../../endpoints/apiEndpoints";

const EditProfile: React.FC = () => {
  const [customers, setCustomer] = useState<GetCustomer | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const jwtToken = getCookie("userToken");

  const getCustomer = async (url: string): Promise<GetCustomer> => {
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

      const data: GetCustomer = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const editCustomer = async (url: string): Promise<EditCustomer> => {
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
      const data: EditCustomer = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editCustomer(ENDPOINT_EDIT_CUSTOMER);
  };

  const handleChange = (key: string, value: string) => {
    setCustomer((prev) => {
      if (!prev) return null;
      return { ...prev, [key]: value };
    });
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerData = await getCustomer(ENDPOINT_CUSTOMER);
        setCustomer(customerData);
      } catch (error) {
        setError("Failed to fetch customer.");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, []);

  const formFields = [
    {
      label: "Email",
      type: "email",
      value: customers?.email,
      key: "email",
      icon: profileIcon,
    },
    {
      label: "Address",
      type: "text",
      value: customers?.address,
      key: "address",
      icon: addressIcon,
    },
    {
      label: "Zipcode",
      type: "text",
      value: customers?.zipcode,
      key: "zipcode",
      maxLength: 5,
      icon: addressIcon,
    },
    {
      label: "City",
      type: "text",
      value: customers?.city,
      key: "city",
      icon: addressIcon,
    },
    {
      label: "Phone Number",
      type: "tel",
      value: customers?.phoneNumber,
      key: "phoneNumber",
      icon: phoneIcon,
    },
  ];

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
            <form className="profile__form" onSubmit={handleSubmit}>
              {formFields.map((field) => (
                <EditProfileForm
                  key={field.key}
                  label={field.label}
                  type={field.type}
                  value={field.value || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  maxLength={field.maxLength}
                  icon={field.icon}
                />
              ))}
              <button className="profile__save-button" type="submit">
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
