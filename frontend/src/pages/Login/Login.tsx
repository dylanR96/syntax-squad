import { useState } from "react";
import "./Login.css";
import logo from "../../assets/images/easybakelogo.svg";
import facebook from "../../assets/images/facebook.svg";
import google from "../../assets/images/google.svg";
import x from "../../assets/images/x.svg";
import dottedLine from "../../assets/images/dotted-line.svg";
import { useNavigate, Link } from "react-router-dom";
import {ENDPOINT_CUSTOMER_LOGIN } from "../../endpoints/apiEndpoints";

// Bättre namn på css klasser

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => { 
    e.preventDefault();

    setError(null);
    try {
      const response = await fetch(ENDPOINT_CUSTOMER_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      console.log(data);
      

      // Kanske finns bättre sätt?
      // For higher security, many modern apps use sessionStorage or localStorage on the client and store session tokens in memory on the server for short-lived access.
      // Cookies set by the backend (e.g., via Set-Cookie headers) allow more secure options like HttpOnly, which is not available to client-side scripts.
      // Consider moving token handling to the backend for higher security.
      document.cookie = `userToken=${
        data.token
      }; path=/; secure; samesite=strict; max-age=${7 * 24 * 60 * 60}`;

      navigate("/home");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <main className="main-login">
      <section className="login">
        <img src={logo} alt="Easybake logo" />
        <h1 className="login__title">Easybake</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            className="login-form__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-form__input"
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Byt ut mot toast */}
          {error && <p className="login-form__error">{error}</p>}
          <div className="login-form__help">
            <label className="login-form__checkbox-label" htmlFor="checkbox">
              <input
                className="login-form__checkbox"
                type="checkbox"
                id="checkbox"
              />
              Kom ihåg mig
            </label>
            <p className="login-form__forgot-password">Glömt lösenordet?</p>
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
