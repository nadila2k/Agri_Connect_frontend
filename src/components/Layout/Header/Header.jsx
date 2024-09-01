import { NavLink } from "react-router-dom";
import { FaHome, FaInfoCircle, FaBox, FaBlog, FaEnvelope, FaSignInAlt } from "react-icons/fa";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        AGRI HUB
      </div>
      <nav>
        <ul className={classes.navLinks}>
          <li>
            <NavLink to="/" className={classes.link}>
              <FaHome className={classes.icon} /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={classes.link}>
              <FaInfoCircle className={classes.icon} /> About
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={classes.link}>
              <FaBox className={classes.icon} /> Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={classes.link}>
              <FaBlog className={classes.icon} /> Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={classes.link}>
              <FaEnvelope className={classes.icon} /> Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <NavLink to="/sign-in" className={`${classes.loginButton} ${classes.link}`}>
        <FaSignInAlt className={classes.icon} /> SignIn
      </NavLink>
    </header>
  );
}

export default Header;
