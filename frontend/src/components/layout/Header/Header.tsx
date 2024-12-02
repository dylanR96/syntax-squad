import "./Header.css";
import Logo from "../../../assets/images/logo.png";
import menuIcon from "../../../assets/images/menu.svg";
import cartIcon from "../../../assets/images/cart.svg";
import { Link } from "react-router-dom";
import Cart from "../../Cart/Cart";
import Menu from "../../Menu/Menu";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="navbar__header">
      <img className="navbar__menu" src={menuIcon} onClick={toggleMenu} />
      <AnimatePresence>
        {isMenuOpen && <Menu toggleMenu={toggleMenu} />}
      </AnimatePresence>

      <Link to={"/home"} className="navbar__logo-and-text">
        <img className="navbar__logo" src={Logo} alt="EasyBake Logo" />
        <h3 className="navbar__title">EasyBake</h3>
      </Link>

      <nav className="navbar__nav">
        <Link to="/profile">Profil</Link>
        <Link to="/about">Om</Link>
      </nav>

      <img className="navbar__cart" src={cartIcon} onClick={toggleCart} />
      <AnimatePresence>{isCartOpen && <Cart />}</AnimatePresence>
    </header>
  );
};

export default Header;
