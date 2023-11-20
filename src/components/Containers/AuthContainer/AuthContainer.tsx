import "./AuthContainer.css";

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth-container" data-testid="auth-container">
      {children}
    </main>
  );
};

export default AuthContainer;
