import "./Footer.css";
import Facebook from "../../../assets/images/facebook-small.svg";
import Instagram from "../../../assets/images/instagram.svg";

const Footer = () => {
  return <footer className="footer__information">
    <h3 className="footer__company-title">EasyBake</h3>
    <p className="footer__address">Bakgatan 4, 12345 Mjölby</p>
    <p className="footer__phone-no">031-1112223</p>
    <p className="footer__email-address">hello@easybake.se</p>
    <a href="#"><img className="footer__social-icon" src={Instagram}/></a>
    <a href="#"><img className="footer__social-icon" src={Facebook}/></a>
  </footer>;
};

export default Footer;

// Lägg in loggan istället för texten
