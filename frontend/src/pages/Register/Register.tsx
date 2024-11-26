import logo from "../../assets/images/easybakelogo.svg";
import { NavLink } from "react-router-dom";

const Register = () => {
  return (
    <main className="login">
      <img src={logo} alt="Easybake logo" />
      <h1 className="login__title">Easybake</h1>
      <form className="login-form" action="">
        <input
          className="login-form__input"
          type="text"
          placeholder="Förnamn"
        />
        <input
          className="login-form__input"
          type="text"
          placeholder="Efternamn"
        />
        <input className="login-form__input" type="email" placeholder="Email" />
        <input
          className="login-form__input"
          type="password"
          placeholder="Lösenord"
        />
        <input
          className="login-form__input"
          type="password"
          placeholder="Bekräfta lösenord"
        />
        <button className="login-form__button" type="submit">
          Registrera
        </button>
      </form>

      <div className="alternative-login">
        <p className="alternative-login__text">
          Har du redan ett konto?{" "}
          <NavLink to={"/"} className="alternative-login__link">
            Logga in
          </NavLink>
        </p>
      </div>
    </main>
  );
};

export default Register;
