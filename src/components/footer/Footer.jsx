import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer} aria-label="Rodapé">
      <div className={styles.content}>
        <img
          src="/DevLandLogo.png"
          alt="Logotipo da DevLand"
          className={styles.logo}
        />
        <p>© DevLand {new Date().getFullYear()}. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

