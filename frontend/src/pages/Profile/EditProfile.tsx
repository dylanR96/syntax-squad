import React from "react";
import "./UserProfile.css";
import profilePicture from "../../assets/images/profile_picture.png";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import EditProfileForm from "../../components/forms/EditProfileForm";

const EditProfile: React.FC = () => {
  return <div className="wrapper">
    <Header />
  <div className="profile-section">
    <img className="profile-image" src={profilePicture} alt="Profile Picture" />
    <h2 className="profile-name">John Dough</h2><span className="edit-link">Edit</span>
    <EditProfileForm />
  </div>

  <Footer />
</div>
};

export default EditProfile;
