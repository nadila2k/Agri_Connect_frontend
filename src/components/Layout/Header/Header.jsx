import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaBox,
  FaBlog,
  FaEnvelope,
  FaSignInAlt,
} from "react-icons/fa";
import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  selectIsAuthenticate,
} from "../../../features/slices/authSlice";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuthenticate);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>AGRI HUB</div>
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
      {isAuth ? (
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>User</MenuItem>
            <MenuItem onClick={handleLogout}>LogOut</MenuItem>
          </Menu>
        </div>
      ) : (
        <NavLink
          to="/sign-in"
          className={`${classes.loginButton} ${classes.link}`}
        >
          <FaSignInAlt className={classes.icon} /> SignIn
        </NavLink>
      )}
    </header>
  );
};

export default Header;
