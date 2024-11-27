import "./Footer.css";
import Facebook from "../../../assets/images/facebook.svg";
import Instagram from "../../../assets/images/instagram.svg";

const Footer = () => {
  return <footer>
    <h3>EASYBAKE</h3>
    <p>Bakgatan 4, 12345 Mjölby</p>
    <p>031-1112223</p>
    <p>hello@easybake.se</p>
    <a href="#"><img className="social-icon" src={Instagram}/></a>
    <a href="#"><img className="social-icon" src={Facebook}/></a>
  </footer>;
};

export default Footer;
