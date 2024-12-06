import React from "react";
import "./UserProfile.css";
import profilePicture from "../../assets/images/profile_picture.png";
import OrderEntry from "./OrderEntry";
import ProfileEditButton from "../../components/ui/ProfileEditButton";
import LogoutButton from "../../components/ui/LogoutButton";

const Profile: React.FC = () => {
  return (
    <>
      <main className="container">
        <div className="profile__container">
          <img
            className="profile__image"
            src={profilePicture}
            alt="Profile Picture"
          />
          <h2 className="profile__name">John Dough</h2>
        </div>
        <h2 className="profile__header">Orderhistorik</h2>
        <OrderEntry />
        <OrderEntry />
        <OrderEntry />
        <OrderEntry />
        <OrderEntry />
        <div className="profile__buttons">
          <ProfileEditButton />
          <LogoutButton />
        </div>
      </main>
    </>
  );
};

export default Profile;
