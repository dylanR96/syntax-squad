import "./Login.css";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <main className="login">
      <img src={logo} alt="" />
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
          <label className="checkbox-label" htmlFor="checkbox">
            <input className="checkbox" type="checkbox" id="checkbox" />
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
          <svg
            className="social-media__icon"
            width="39"
            height="39"
            viewBox="0 0 39 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M38.25 19.5C38.25 9.15 29.85 0.75 19.5 0.75C9.15 0.75 0.75 9.15 0.75 19.5C0.75 28.575 7.2 36.1312 15.75 37.875V25.125H12V19.5H15.75V14.8125C15.75 11.1937 18.6938 8.25 22.3125 8.25H27V13.875H23.25C22.2187 13.875 21.375 14.7187 21.375 15.75V19.5H27V25.125H21.375V38.1562C30.8438 37.2187 38.25 29.2312 38.25 19.5Z"
              fill="#CC8D80"
            />
          </svg>
          <svg
            className="social-media__icon"
            width="33"
            height="34"
            viewBox="0 0 33 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.10732 9.18333C3.49461 6.42256 5.62202 4.10176 8.25198 2.48011C10.8819 0.858454 13.9109 -0.000210812 17.0007 3.88223e-08C21.4923 3.88223e-08 25.2657 1.65167 28.1507 4.34167L23.3723 9.12167C21.644 7.47 19.4473 6.62833 17.0007 6.62833C12.659 6.62833 8.98399 9.56167 7.67565 13.5C7.34232 14.5 7.15232 15.5667 7.15232 16.6667C7.15232 17.7667 7.34232 18.8333 7.67565 19.8333C8.98565 23.7733 12.659 26.705 17.0007 26.705C19.2423 26.705 21.1507 26.1133 22.644 25.1133C23.5097 24.5433 24.2509 23.8037 24.8227 22.9392C25.3944 22.0746 25.785 21.1031 25.9707 20.0833H17.0007V13.6367H32.6973C32.894 14.7267 33.0007 15.8633 33.0007 17.045C33.0007 22.1217 31.184 26.395 28.0307 29.295C25.274 31.8417 21.5007 33.3333 17.0007 33.3333C14.8117 33.3342 12.644 32.9037 10.6216 32.0664C8.59907 31.2292 6.7614 30.0016 5.21359 28.4537C3.66577 26.9059 2.43814 25.0682 1.60088 23.0458C0.763608 21.0233 0.33311 18.8556 0.333986 16.6667C0.333986 13.9767 0.977319 11.4333 2.10732 9.18333Z"
              fill="#CC8D80"
            />
          </svg>
          <svg
            className="social-media__icon"
            width="33"
            height="31"
            viewBox="0 0 33 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.9875 0.545898H31.0483L19.9933 13.2132L33 30.4533H22.8171L14.8359 19.9994L5.71371 30.4533H0.648214L12.4716 16.8998L0 0.548256H10.4421L17.6456 10.1018L25.9875 0.545898ZM24.2079 27.4173H27.0129L8.91 3.42397H5.90229L24.2079 27.4173Z"
              fill="#CC8D80"
            />
          </svg>
        </div>
        <p className="alternative-login__text">
          Har du inget konto?{" "}
          <NavLink to={"/register"} className="alternative-login__link">
            Registrera dig
          </NavLink>
        </p>
      </div>
    </main>
  );
};

export default Login;
