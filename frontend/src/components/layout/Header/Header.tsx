import "./Header.css";
import Logo from "../../../assets/images/logo.png";
import Menu from "../../../assets/images/menu.svg";
import Cart from "../../../assets/images/cart.svg";


const Header = () => {
  return <header>
    <img className="header-svg" src={Menu} />
<div className="logo-plus-text">
    <img className="logo" src={Logo} alt="EasyBake Logo" />
    <h3>EasyBake</h3>
    </div>
    <img className="header-svg" src={Cart} />
    </header>
};

export default Header;