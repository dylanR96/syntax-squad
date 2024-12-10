import React, { useState } from "react";
import { ENDPOINT_ADMIN_LOGIN } from "../../../endpoints/apiEndpoints";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
type AdminLoginType = {
  email: string;
  password: string;
};
type LoginResponseType = {
  token: string;
  role: string;
};
const AdminLogin = () => {
  const [adminLogin, setAdminLogin] = useState<AdminLoginType>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminLogin((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin.email && adminLogin.password) {
      try {
        const response = await fetch(ENDPOINT_ADMIN_LOGIN, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminLogin),
        });
        if (!response.ok) {
          toast.error(`Fel användarnamn eller lösenord`);
          return;
        }
        const data: LoginResponseType = await response.json();

        sessionStorage.setItem("userToken", data.token);
        sessionStorage.setItem("userRole", data.role);
        toast.success("Inloggad som admin");
        navigate("/admin/ingredients");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Ange e-post och lösenord");
    }
  };
  return (
    <section className="login login--admin">
      <h1 className="login__title">Easybake - admin</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-form__input"
          type="text"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
        />
        <input
          className="login-form__input"
          type="password"
          name="password"
          placeholder="Lösenord"
          onChange={handleChange}
        />
        <button className="login-form__button">Logga in</button>
      </form>
    </section>
  );
};

export default AdminLogin;
