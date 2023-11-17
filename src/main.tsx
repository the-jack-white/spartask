import React from "react";
import ReactDOM from "react-dom/client";
import { TaskProvider } from "./context/Task/TaskContext";
import { AuthProvider } from "./context/Auth/AuthContext";
import App from "./App";
import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </AuthProvider>
  </React.StrictMode>
);
