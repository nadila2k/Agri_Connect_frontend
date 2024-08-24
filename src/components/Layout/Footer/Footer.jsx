import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes['footer-content']}>
        <div className={`${classes['footer-section']} ${classes.about}`}>
          <h2 className={classes['footer-title']}>AGRI HUB</h2>
          <p>
            We are dedicated to providing you with the best organic produce to
            support a healthy lifestyle and sustainable future.
          </p>
        </div>
        <div className={`${classes['footer-section']} ${classes.links}`}>
          <h3 className={classes['footer-title']}>Quick Links</h3>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#products">Products</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className={`${classes['footer-section']} ${classes.contact}`}>
          <h3 className={classes['footer-title']}>Contact Us</h3>
          <p>Email: contact@agrihub.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className={`${classes['footer-section']} ${classes.social}`}>
          <h3 className={classes['footer-title']}>Follow Us</h3>
          <div className={classes['social-icons']}>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* <FontAwesomeIcon icon={faFacebookF} /> */}
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* <FontAwesomeIcon icon={faTwitter} /> */}
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* <FontAwesomeIcon icon={faInstagram} /> */}
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* <FontAwesomeIcon icon={faLinkedin} /> */}
            </a>
          </div>
        </div>
      </div>
      <div className={classes['footer-bottom']}>
        <p>&copy; {new Date().getFullYear()} AGRI HUB. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer