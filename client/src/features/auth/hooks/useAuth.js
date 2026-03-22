//hook layer

import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, loading, setLoading, setUser } = context;

    const handelLogin = async ({ eamil, password }) => {
        setLoading(true);
        try {

            const data = await login({ eamil, password })
            setUser(data.user)
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false);
        }
    }

    const handelRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false);
        }
    }

    const handelLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false);
        }
    }

    return {
        user, loading, handelRegister, handelLogin, handelLogout
    }
}   