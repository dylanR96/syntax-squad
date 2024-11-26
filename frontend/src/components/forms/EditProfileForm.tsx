const EditProfileForm = () => {
    
  return <form className="profile-form">
  <div className="form-group">
    <span className="icon">📧</span>
    <input type="email" placeholder="min.mail@gmail.com" />
  </div>
  <div className="form-group">
    <span className="icon">📍</span>
    <input type="text" placeholder="Hemadressvägen 14" />
  </div>
  <div className="form-group">
    <span className="icon">📍</span>
    <input type="text" maxLength={5} inputMode="numeric" placeholder="Postnummer" />
  </div>
  <div className="form-group">
    <span className="icon">📍</span>
    <input type="text" placeholder="Ort" />
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
};

export default EditProfileForm;

