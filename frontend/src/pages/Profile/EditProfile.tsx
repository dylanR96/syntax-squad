import React from "react";
import "./UserProfile.css";
import profilePicture from "../../assets/images/profile_picture.png";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import EditProfileForm from "../../components/forms/EditProfileForm";

const EditProfile: React.FC = () => {
  return <div className="wrapper">
    <Header />
  <main className="container">
    <div className="profile__container">
    <img className="profile__image" src={profilePicture} alt="Profile Picture" />
    <h2 className="profile__name">John Dough</h2><span className="profile__edit-link">Edit</span>
    </div>
    <EditProfileForm />
  </main>

  <Footer />
  </div>
};

export default EditProfile;
