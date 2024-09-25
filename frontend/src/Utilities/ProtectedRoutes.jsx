import React from "react";
import { useAuth } from "../Context/ContextAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, role }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (role && user && !role.includes(user.role)) {
        return <h1>No Access</h1>
    }

    if (!user) {
        return <Navigate to='/signin' replace></Navigate>
    }
    return children
}
export default ProtectedRoutes;