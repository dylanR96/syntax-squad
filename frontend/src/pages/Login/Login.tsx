import "./Login.css";
import logo from "../../assets/images/easybakelogo.svg";
import facebook from "../../assets/images/facebook.svg";
import google from "../../assets/images/google.svg";
import x from "../../assets/images/x.svg";
import dottedLine from "../../assets/images/dotted-line.svg";
import { Link } from "react-router-dom";

// Bättre namn på css klasser

const Login = () => {
  return (
    <main className="main-login">
      <section className="login">
        <img src={logo} alt="Easybake logo" />
        <h1 className="login__title">Easybake</h1>
        <form className="login-form" action="">
          <input
            className="login-form__input"
            type="text"
            placeholder="Användarnamn"
          />
          <input
            className="login-form__input"
            type="password"
            placeholder="Lösenord"
          />
          <div className="login-form__help">
            <label className="login-form__checkbox-label" htmlFor="checkbox">
              <input
                className="login-form__checkbox"
                type="checkbox"
                id="checkbox"
              />
              Remember me
            </label>
            <p className="login-form__forgot-password">Forgot password?</p>
          </div>
          <button className="login-form__button" type="submit">
            Logga in
          </button>
        </form>

        <div className="alternative-login">
          <p className="alternative-login__text">Eller logga in med</p>
          <div className="social-media">
            <img
              className="social-media__icon"
              src={facebook}
              alt="Facebook logo"
            />
            <img
              className="social-media__icon"
              src={google}
              alt="Google logo"
            />
            <img className="social-media__icon" src={x} alt="X logo" />
          </div>
          <p className="alternative-login__text">
            Har du inget konto?{" "}
            <Link to={"/register"} className="alternative-login__link">
              Registrera dig
            </Link>
          </p>
        </div>
      </section>

      <div className="slogan-background"></div>
      <h2 className="slogan-top">Vi står för måtten</h2>
      <h2 className="slogan-bottom">Du står för magin</h2>
      <img className="dotted-line" src={dottedLine} />
    </main>
  );
};

export default Login;
