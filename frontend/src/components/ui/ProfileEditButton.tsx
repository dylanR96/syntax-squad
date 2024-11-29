import { useNavigate } from "react-router-dom";

const ProfileEditButton = () => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/profile/edit");
  };

  return (
    <button className="profile__edit-button" onClick={handleEditClick}>
      Ändra profil
    </button>
  );
};

export default ProfileEditButton;
