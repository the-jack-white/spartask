import { useState } from "react";
import { useAuth } from "../../context";

import "./AuthForm.css";

const AuthForm = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="auth-form-container">
      <h1>Login</h1>
      <input
        type="text"
        className="auth-form-input text-lg"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="auth-form-input text-lg"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="auth-form-button text-lg"
        disabled={email.length < 1 || password.length < 1}
        onClick={() => login(email, password)}
      >
        Submit
      </button>
    </div>
  );
};

export default AuthForm;
