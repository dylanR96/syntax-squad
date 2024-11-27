import React from "react";
import "./UserProfile.css";
import profilePicture from "../../assets/images/profile_picture.png";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import OrderEntry from "../../components/forms/OrderEntry";

const Profile: React.FC = () => {
  return (
  <>
    <Header />
  <main className="container">
    <div className="profile__container">
    <img className="profile__image" src={profilePicture} alt="Profile Picture" />
    <h2 className="profile__name">John Dough</h2>
    </div>
    <h2 className="profile__header">Orderhistorik</h2>
    <OrderEntry />
    <OrderEntry />
    <OrderEntry />
    <button className="profile__edit-button" type="submit">Ändra profil</button>
    <button className="profile__logout-button" type="submit">Logga ut</button>
  </main>

  <Footer />
  </>
)};

export default Profile;
