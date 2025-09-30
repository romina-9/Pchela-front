// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

export default function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/LoginPage" />;
}
