import { useAuth } from "../../context";
import "./Header.css";

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="header-container">
      <span className="header-logo">SPARTASK</span>
      <button className="header-button text-lg" onClick={logout}>
        Logout
        <span className="bi bi-box-arrow-right header-button-icon" />
      </button>
    </header>
  );
};

export default Header;
