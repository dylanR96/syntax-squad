import "./Menu.css";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import remove from "../../assets/images/remove.svg";

const menuVariants = {
  open: {
    x: 0,
    transition: {
      ease: "easeInOut",
    },
  },
  closed: {
    x: "-100%",
    transition: {
      ease: "easeInOut",
    },
  },
};

type MenuProps = {
  toggleMenu: () => void;
};

const Menu = ({ toggleMenu }: MenuProps) => {
  return (
    <motion.div
      className="menu"
      variants={menuVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <img className="menu__close" src={remove} onClick={toggleMenu} />
      <NavLink to={"/profile"} onClick={toggleMenu} className="menu__link">
        Profil
      </NavLink>
      <NavLink to={"/about"} onClick={toggleMenu} className="menu__link">
        Om oss
      </NavLink>
    </motion.div>
  );
};

export default Menu;
