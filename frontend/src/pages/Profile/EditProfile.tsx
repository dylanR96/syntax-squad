import React from "react";
import "./UserProfile.css";
import profilePicture from "../../assets/images/profile_picture.png";
import EditProfileForm from "./EditProfileForm";

const EditProfile: React.FC = () => {
  return <div className="wrapper">
  <main className="container">
    <div className="profile__container">
    <img className="profile__image" src={profilePicture} alt="Profile Picture" />
    <h2 className="profile__name">John Dough</h2>
    </div>
    <EditProfileForm />
  </main>
  </div>
};

export default EditProfile;
