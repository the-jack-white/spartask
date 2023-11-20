import { useState } from "react";
import { useAuth } from "../../context";

import "./AuthForm.css";

const AuthForm = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="auth-form-container" data-testid="auth-form-container">
      <h1 data-testid="auth-form-heading">Login</h1>
      <input
        type="text"
        className="auth-form-input text-lg"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        data-testid="auth-form-email"
      />
      <input
        type="password"
        className="auth-form-input text-lg"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        data-testid="auth-form-password"
      />
      <button
        className="auth-form-button text-lg"
        disabled={email.length < 1 || password.length < 1}
        onClick={() => login(email, password)}
        data-testid="auth-form-button"
      >
        Submit
      </button>
    </div>
  );
};

export default AuthForm;
