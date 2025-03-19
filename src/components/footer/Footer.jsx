import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`footer ${styles.footer}`}>
      <div className={styles.content}>
        <img
          src="/DevLandLogo.png"
          alt="DevLand Logo"
          className={styles.logo}
        />
        <p>© DevLand. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
