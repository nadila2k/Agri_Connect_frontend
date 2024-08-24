import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

const  Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        AGRI HUB
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={classes.link}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={classes.link}>About</NavLink>
          </li>
          <li>
          <NavLink to="/products" className={classes.link}>Products</NavLink>
          </li>
          <li>
          <NavLink to="/blog" className={classes.link}>Blog</NavLink>
          </li>
          <li>
          <NavLink to="/contact" className={classes.link}>Contact</NavLink>
          </li>
          <li>
            <button>Login</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
