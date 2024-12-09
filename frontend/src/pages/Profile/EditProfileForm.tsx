import { EditFormProps } from "./types";

const EditProfileForm: React.FC<EditFormProps> = ({
  label,
  type,
  value,
  onChange,
  maxLength,
  icon,
}) => {
  return (
    <div className="profile__form-group">
      <span className="profile__icon">
        <img src={icon} alt={`${label} Icon`} />
      </span>
      <input
        className="profile__input"
        type={type}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
    </div>
  );
};

export default EditProfileForm;
