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
  zipcode: string;
  city: string;
  phoneNumber: string;
};

const Register = () => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    surname: "",
    address: "",
    zipcode: "",
    city: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // const numericFields = ["phoneNumber", "zipcode"];
    // const parsedValue = numericFields.includes(name)
    //   ? parseInt(value, 10)
    //   : value;

    // setUserData((prev) => ({ ...prev, [name]: parsedValue }));
    setUserData((prev) => ({ ...prev, [name]: value }));
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

    fetch("https://i1g1r4ighf.execute-api.eu-north-1.amazonaws.com/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/home");
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
        <form className="login-form" onSubmit={submitHandler}>
          <input
            className="login-form__input"
            type="text"
            name="firstname"
            placeholder="Förnamn"
            value={userData.firstname}
            onChange={handleChange}
            required
          />
          <input
            className="login-form__input"
            type="text"
            name="surname"
            placeholder="Efternamn"
            value={userData.surname}
            onChange={handleChange}
            required
          />
          <input
            className="login-form__input"
            type="text"
            name="address"
            placeholder="Adress"
            value={userData.address}
            onChange={handleChange}
            required
          />
          <input
            className="login-form__input"
            type="number"
            name="zipcode"
            placeholder="Postkod"
            value={userData.zipcode}
            onChange={handleChange}
            required
          />
          <input
            className="login-form__input"
            type="text"
            name="city"
            placeholder="Stad"
            value={userData.city}
            onChange={handleChange}
            required
          />
          <input
            className="login-form__input"
            type="number"
            name="phoneNumber"
            placeholder="Telefonnummer"
            value={userData.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            className="login-form__input"
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <input
            className="login-form__input"
            type="password"
            name="password"
            placeholder="Lösenord"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <input
            className="login-form__input"
            type="password"
            name="confirmPassword"
            placeholder="Bekräfta lösenord"
            value={userData.confirmPassword}
            onChange={handleChange}
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
