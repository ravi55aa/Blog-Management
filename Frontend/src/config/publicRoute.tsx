import {
    Navigate,
    Outlet,
} from "react-router-dom";

import {
    useEffect,
    useState,
} from "react";

import { AuthService } from "../api/Services/AuthService";

export default function PublicRoute() {

    const [loading, setLoading] =
        useState(true);

    const [isAuthenticated,
        setIsAuthenticated] =
        useState(false);

    useEffect(() => {

        const verifyUser = async () => {

            try {

                const res = await AuthService.getCurrentUser();

                setIsAuthenticated(res.success!);

            } catch {

                setIsAuthenticated(false);

            } finally {

                setLoading(false);

            }
        };

        verifyUser();

    }, []);

    if (loading) {
        return null;
    }

    return isAuthenticated
        ? <Navigate to="/blog/dashboard" replace />
        : <Outlet />;
}