import React from "react";
import "./UserProfile.css";
import profilePicture from "../../assets/images/profile_picture.png";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";

const Profile: React.FC = () => {
  return <>
    <Header />
  <main>
    <img className="profile__image" src={profilePicture} alt="Profile Picture" />
    <h2 className="profile__name">John Dough</h2>
    <h2 className="profile-header">Mina favoriter</h2>
    <div className="product-template"></div>
    <div className="product-template"></div>
    <h2 className="profile-header">Orderhistorik</h2>
  </main>

  <Footer />
</>
};

export default Profile;
