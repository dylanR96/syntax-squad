import React from "react";
import "./UserProfile.css";
import profilePicture from "../../assets/images/profile_picture.png";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";

const Profile: React.FC = () => {
  return <div className="wrapper">
    <Header />
  <main>
    <img className="profile__image" src={profilePicture} alt="Profile Picture" />
    <h2 className="profile__name">John Dough</h2>
    <h2 className="profile__header">Orderhistorik</h2>
    <div className="profile__order-history">
    <a href="#"><p className="profile__order-number">874763472</p></a>
      <p className="profile__order-amount">80 kr</p>
      <p className="profile__order-date">2021-09-01 11:43</p>
    </div>
    <div className="profile__order-history">
    <a href="#"><p className="profile__order-number">874763472</p></a>
      <p className="profile__order-amount">180 kr</p>
      <p className="profile__order-date">2021-10-15 12:54</p>
    </div>
    <div className="profile__order-history">
    <a href="#"><p className="profile__order-number">874763472</p></a>
      <p className="profile__order-amount">59 kr</p>
      <p className="profile__order-date">2023-04-05 08:15</p>
    </div>
    <button className="profile__edit-button" type="submit">Ändra profil</button>
    <button className="profile__logout-button" type="submit">Logga ut</button>
  </main>

  <Footer />
</div>
};

export default Profile;
