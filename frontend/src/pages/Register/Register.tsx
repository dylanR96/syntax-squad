import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/easybakelogo.svg";
import dottedLine from "../../assets/images/dotted-line.svg";

type UserData = {
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  surname: string;
  address: string;
  zipcode: number;
  city: string;
  phoneNumber: number;
};

const Register = () => {
  const [userData, setuserData] = useState<UserData>({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    surname: "",
    address: "",
    zipcode: 0,
    city: "",
    phoneNumber: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Convert phoneNumber and zipcode to numbers if applicable
    const numericFields = ["phoneNumber", "zipcode"];
    const parsedValue = numericFields.includes(name)
      ? parseInt(value, 10)
      : value;

    setUserData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const {
      email,
      password,
      confirmPassword,
      firstname,
      surname,
      address,
      zipcode,
      city,
      phoneNumber,
    } = userData;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const payload = {
      email,
      password,
      firstname,
      surname,
      address,
      zipcode,
      city,
      phoneNumber,
    };

    // Example API call
    fetch("https://your-backend-api.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/success");
        } else {
          throw new Error("Registration failed.");
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <main className="main-login">
      <section className="login">
        <img src={logo} alt="Easybake logo" />
        <h1 className="login__title">Easybake</h1>
        <form className="login-form" action="">
          <input
            className="login-form__input"
            type="text"
            placeholder="Förnamn"
            required
          />
          <input
            className="login-form__input"
            type="text"
            placeholder="Efternamn"
            required
          />
          <input
            className="login-form__input"
            type="text"
            placeholder="Adress"
            required
          />
          <input
            className="login-form__input"
            type="number"
            placeholder="Postkod"
            required
          />
          <input
            className="login-form__input"
            type="text"
            placeholder="Stad"
            required
          />
          <input
            className="login-form__input"
            type="number"
            placeholder="Telefonnummer"
            required
          />
          <input
            className="login-form__input"
            type="email"
            placeholder="Email"
            required
          />
          <input
            className="login-form__input"
            type="password"
            placeholder="Lösenord"
            required
          />
          <input
            className="login-form__input"
            type="password"
            placeholder="Bekräfta lösenord"
            required
          />
          <button className="login-form__button" type="submit">
            Registrera
          </button>
        </form>

        <div className="alternative-login">
          <p className="alternative-login__text">
            Har du redan ett konto?{" "}
            <Link to={"/"} className="alternative-login__link">
              Logga in
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

export default Register;
