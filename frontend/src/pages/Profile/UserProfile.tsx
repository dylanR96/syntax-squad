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
    <button className="profile__edit-button" type="submit">Ändra profil</button>
    <button className="profile__logout-button" type="submit">Logga ut</button>
  </main>

  <Footer />
</div>
};

export default Profile;
