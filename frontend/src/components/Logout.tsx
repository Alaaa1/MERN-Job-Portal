import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { UserContext } from "./UsersContext";

export default function Logout() {
    const [cookies, setCookie, removeCookie] = useCookies<string>([]);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        removeCookie("token");
        setUser(null);
        navigate("/login");
    }, [removeCookie, setUser, navigate]);

    return (
        <p>Logging out...</p>
    )
}