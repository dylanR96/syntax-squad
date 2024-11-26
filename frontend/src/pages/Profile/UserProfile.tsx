import React from "react";
import "./UserProfile.css";
import profilePicture from "../../assets/images/profile_picture.png";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";

const Profile: React.FC = () => {
  return <div className="wrapper">
    <Header />
  <div className="profile-section">
    <img className="profile-image" src={profilePicture} alt="Profile Picture" />
    <h2 className="profile-name">John Dough</h2>
    <h2 className="profile-header">Mina favoriter</h2>
    <div className="product-template"></div>
    <div className="product-template"></div>
    <h2 className="profile-header">Orderhistorik</h2>
  </div>

  <Footer />
</div>
};

export default Profile;
