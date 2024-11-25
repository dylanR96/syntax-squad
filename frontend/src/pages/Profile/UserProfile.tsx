import React from "react";
import "./UserProfile.css";
import profilePicture from "../../assets/images/profile_picture.png";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import EditProfile from "../../components/forms/EditProfile";

const UserProfile: React.FC = () => {
  return <div className="wrapper">
    <Header />
  <div className="profile-section">
    <img className="profile-image" src={profilePicture} alt="Profile Picture" />
    <h2>John Dough <span className="edit-link">Edit</span></h2>
    <EditProfile />
  </div>

  <Footer />
</div>
};

export default UserProfile;
