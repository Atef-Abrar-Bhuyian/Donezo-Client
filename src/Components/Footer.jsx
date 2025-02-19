const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center text-base-content">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by <span className="font-black text-purple-950">DONEZO</span>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
