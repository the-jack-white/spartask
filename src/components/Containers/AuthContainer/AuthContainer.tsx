import Package from "../../../../package.json";
import "./AuthContainer.css";

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth-container" data-testid="auth-container">
      {children}
      <span className="app-version">v{Package.version}</span>
    </main>
  );
};

export default AuthContainer;
