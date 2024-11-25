import React from "react";
import "./UserProfile.css";
import profilePicture from "../../assets/images/profile_picture.png";

const UserProfile: React.FC = () => {
  return <div className="profile-container">
  <p>NAV HÄR</p>

  <div className="profile-section">
    <img className="profile-image" src={profilePicture} alt="Profile Picture" />
    <h2>John Dough <span className="edit-link">Edit</span></h2>
    <form className="profile-form">
      <div className="form-group">
        <span className="icon">📧</span>
        <input type="email" placeholder="min.mail@gmail.com" />
      </div>
      <div className="form-group">
        <span className="icon">📍</span>
        <input type="text" placeholder="Hemadressvägen 14" />
      </div>
      <div className="form-group">
        <span className="icon">📞</span>
        <input type="tel" placeholder="07012345678" />
      </div>
      <div className="form-group">
        <span className="icon">🔒</span>
        <input type="password" placeholder="Lösenord" />
      </div>
      <div className="form-group">
        <span className="icon">🔒</span>
        <input type="password" placeholder="Bekräfta lösenord" />
      </div>
      <button className="save-button" type="submit">Spara ändringar</button>
    </form>
  </div>

  <p>FOOTER HÄR</p>
</div>
;
};

export default UserProfile;
