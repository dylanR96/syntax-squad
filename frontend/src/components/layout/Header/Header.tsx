import "./Header.css";
import Logo from "../../../assets/images/logo.png";
import Menu from "../../../assets/images/menu.svg";
import Cart from "../../../assets/images/cart.svg";
import { Link } from "react-router-dom";


const Header = () => {
  return <header className="navbar__header">
    <img className="navbar__menu" src={Menu} />
    <div className="navbar__logo-and-text">
    <img className="navbar__logo" src={Logo} alt="EasyBake Logo" />
    <h3>EasyBake</h3>
    </div>
    <nav className="navbar__nav">
    <Link to="/profile">Profil</Link>
    <Link to="/about">Om</Link>
    </nav>
    <img className="navbar__cart" src={Cart} />
    </header>
};

export default Header;