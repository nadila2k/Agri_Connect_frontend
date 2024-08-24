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
            <button>Home</button>
          </li>
          <li>
            <button>About</button>
          </li>
          <li>
            <button>Products</button>
          </li>
          <li>
            <button>Blog</button>
          </li>
          <li>
            <button>Contact</button>
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
