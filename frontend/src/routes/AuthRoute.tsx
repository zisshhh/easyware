import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("token");

    if (isAuthenticated) {
        return <Navigate to={"/home"} replace />
    }

    return children
}